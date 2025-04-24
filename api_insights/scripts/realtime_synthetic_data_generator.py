# scheduled_synthetic_and_news_generator.py
import os
import json
import pandas as pd
from datetime import datetime
import time
import schedule
from typing import Type
from pydantic import BaseModel, Field
from crewai.tools import BaseTool
from openai import OpenAI
from src.config.settings import settings
from pathlib import Path

# Load OpenAI API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Output folders
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "data_snapshots"
news_output_dir = BASE_DIR / "data" / "news_snapshots"
data_output_dir = BASE_DIR / "data" / "data_snapshots"
print(news_output_dir)
# --- News Signal Generation --- #
def generate_news_signals():
    print("📰 Generating simulated news signals using GPT-4o...")
    prompt = """
    Generate 5 synthetic real estate news signals in JSON array format. 
    Each signal should include:
      - source: News website or agency name (e.g. Gulf News, Khaleej Times)
      - headline: Brief headline of the article
      - link: A fake but realistic news article link
      - signal: Extracted signal (e.g. "New metro line announced")
      - expected_impact: What area/type it impacts (e.g. "Dubai Marina rents to rise")

    The news signals should span across:
      - New infrastructure projects (e.g. metro, airport, roads, permits, zoning)
      - DIFC announcements (e.g. fintech hubs, corporate movement, regulation)
      - Government policy shifts (e.g. rent caps, new taxes, visa reforms)
      - Economic indicators (e.g. interest rates, inflation, GDP growth)
      - Construction pipeline activity (e.g. megaproject launches, delivery delays)
      - Global or regional macro-events (e.g. wars, climate disasters, migration, new trade corridors)

    Format:
    [
      {
        "source": "Gulf News",
        "headline": "Dubai launches new Green Metro Corridor",
        "link": "https://gulfnews.com/dubai-metro-expansion",
        "signal": "Metro expansion announced",
        "expected_impact": "Rents may rise along Sheikh Zayed Road"
      },
      ...
    ]

    Return only valid JSON array, no markdown or commentary.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a real estate news simulation bot."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        news_json = response.choices[0].message.content.strip()
        if news_json.startswith("```json"):
            news_json = news_json.replace("```json", "").replace("```", "").strip()

        news_data = json.loads(news_json)
        df = pd.DataFrame(news_data)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_path = os.path.join(news_output_dir, f"news_signals_{timestamp}.csv")
        df.to_csv(file_path, index=False)

        print(f"✅ News signals saved to {file_path}")
        return f"✅ Saved: {file_path}"

    except Exception as e:
        print(f"❌ Error during news simulation: {str(e)}")
        return json.dumps({"error": str(e)})


# --- Rental Listing Generation --- #
sample_data = [
    {
        "Address": "Cherrywoods, Dubailand, Dubai",
        "Rent": 200000, "Beds": 3, "Baths": 4, "Type": "Townhouse", "Area_in_sqft": 2232,
        "Rent_per_sqft": 89.61, "Rent_category": "High", "Frequency": "Yearly",
        "Furnishing": "Unfurnished", "Purpose": "For Rent", "Posted_date": "03-01-2024",
        "Age_of_listing_in_days": 109, "Location": "Dubailand", "City": "Dubai",
        "Latitude": 25.05865715, "Longitude": 55.24599921
    },
    {
        "Address": "DAMAC Heights, Dubai Marina, Dubai",
        "Rent": 360000, "Beds": 3, "Baths": 4, "Type": "Apartment", "Area_in_sqft": 1948,
        "Rent_per_sqft": 184.80, "Rent_category": "High", "Frequency": "Yearly",
        "Furnishing": "Furnished", "Purpose": "For Rent", "Posted_date": "03-01-2024",
        "Age_of_listing_in_days": 109, "Location": "Dubai Marina", "City": "Dubai",
        "Latitude": 25.0786415, "Longitude": 55.1352524
    }
]

class SyntheticRentDataInput(BaseModel):
    count: int = Field(20, description="Number of synthetic listings to generate")
    city: str = Field("Dubai", description="City for which listings should be generated")
    location_hint: str = Field("", description="Optional area hint like 'Marina', 'JVC', etc.")

class SyntheticRentDataTool(BaseTool):
    name: str = "Synthetic Rent Data Generator"
    description: str = "Generates realistic rental market data using GPT-4o and saves it to a CSV file."
    args_schema: Type[BaseModel] = SyntheticRentDataInput

    def _run(self, count: int = 20, city: str = "Dubai", location_hint: str = "") -> str:
        prompt = f"""
        Generate {count} synthetic real estate rental listings in raw JSON format.
        Each listing should include:
        - Address, Rent, Beds, Baths, Type, Area_in_sqft
        - Rent_per_sqft (calculated)
        - Rent_category (Low, Medium, High)
        - Frequency, Furnishing, Purpose
        - Posted_date, Age_of_listing_in_days, Location, City, Latitude, Longitude
        Return only JSON array.
        """
        try:
            print("📤 Prompting GPT-4o for synthetic rent listings...")
            completion = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are a real estate data generator."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            response = completion.choices[0].message.content.strip()
            if response.startswith("```json"):
                response = response.replace("```json", "").replace("```", "").strip()

            gpt_data = json.loads(response)
            df_gpt = pd.DataFrame(gpt_data)
            df_sample = pd.DataFrame(sample_data)
            df_final = pd.concat([df_sample, df_gpt], ignore_index=True)

            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            file_path = os.path.join(data_output_dir, f"synthetic_listings_{timestamp}.csv")
            df_final.to_csv(file_path, index=False)

            print(f"✅ Generated and saved {len(df_final)} listings to {file_path}")
            return f"✅ Saved: {file_path}"

        except Exception as e:
            print(f"❌ Error generating synthetic listings: {str(e)}")
            return json.dumps({"error": str(e)})

# Scheduling logic
def generate_data():
    tool = SyntheticRentDataTool()
    result = tool.run()
    print(f"[{datetime.now()}] 🏠 {result}")

# Run both immediately
generate_news_signals()
generate_data()

# Schedule every 2 minutes
schedule.every(2).minutes.do(generate_news_signals)
schedule.every(2).minutes.do(generate_data)

print("⏱ Starting dual schedulers: synthetic rental + news every 2 minutes...")
while True:
    schedule.run_pending()
    time.sleep(1)
