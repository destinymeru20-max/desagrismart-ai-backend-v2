import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/api", (req, res) => {
  res.json({ message: "DesagriSmart AI API running", status: "live" });
});

app.get("/", (req, res) => {
  res.send("DesagriSmart AI Backend is Live");
});

function getAnswer(q, dept) {
  const text = q.toLowerCase();

  if (text.includes("rain") || text.includes("weather") || text.includes("otukpo") || text.includes("forecast") || text.includes("dry season") || text.includes("wet season")) {
    return "WEATHER - OTUKPO / BENUE: We are in Nov - dry season is starting. Rain is reducing. If you still see clouds, expect light showers, not heavy rain. Best advice: Harvest remaining maize/cassava now, mulch your soil, water vegetables in morning/evening, and don't plant maize now - wait for next rains in March/April. For dry season farming, use irrigation or near-stream land.";
  }
  if (text.includes("maize") || text.includes("corn")) {
    return "MAIZE: Spacing 75cm x 25cm at start of rains. Apply NPK 20-10-10 at planting, Urea at 3 weeks. Control Fall Armyworm with neem or Emamectin. Harvest when husk turns brown and dry. Store in dry airtight bags.";
  }
  if (text.includes("cassava")) {
    return "CASSAVA: Plant cuttings 1m x 1m at start of rains. Use improved varieties like TME 419. Weed at 4 and 8 weeks. Harvest at 9-12 months. Don't plant in waterlogged soil.";
  }
  if (text.includes("rice")) {
    return "RICE: Use lowland / swampy area. Nursery first, transplant after 21 days at 20cm x 20cm. Apply NPK at planting, Urea at tillering. Keep water level 5cm. Control birds and weeds early.";
  }
  if (text.includes("yam")) {
    return "YAM: Plant seed yam in mounds 1m apart at start of rains (March-April). Stake vines. Apply compost/manure. Harvest when leaves dry. Store in airy barn, not on ground.";
  }
  if (text.includes("poultry") || text.includes("chicken") || text.includes("layers") || text.includes("broiler") || text.includes("feed")) {
    return "POULTRY: Layers need 16-17% protein feed, 120g per bird per day, clean water always. Broilers need starter 21% protein for 4 weeks, then finisher. Vaccinate Newcastle at day 1, Gumboro at day 14. Keep litter dry to prevent disease.";
  }
  if (text.includes("catfish") || text.includes("fish") || text.includes("pond")) {
    return "CATFISH: Stock 10-15 fingerlings per m2. Feed 2x daily with 35-42% protein floating feed. Change 20% water weekly. Don't overfeed. Harvest at 6-8 months when 1kg+. Keep pond shaded.";
  }
  if (text.includes("yellow") || text.includes("leaves") || text.includes("disease") || text.includes("pest") || text.includes("armyworm") || text.includes("insect")) {
    return "DISEASE / PEST: Yellow leaves = often nitrogen deficiency or too much water. Apply Urea / NPK and improve drainage. For Fall Armyworm, spray neem oil or Emamectin early morning. For cassava mosaic, uproot infected plants and use clean cuttings. Always check under leaves.";
  }
  if (text.includes("soil") || text.includes("fertilizer") || text.includes("npk") || text.includes("urea") || text.includes("manure")) {
    return "SOIL & FERTILIZER: Test your soil if possible. For most Benue soils: Maize = NPK 20-10-10 at planting + Urea at 3 weeks. Add poultry manure/compost to improve soil. Don't apply fertilizer on dry soil - apply before rain or water after.";
  }
  if (text.includes("price") || text.includes("market") || text.includes("sell") || text.includes("cost") || text.includes("profit") || text.includes("business") || text.includes("start") || text.includes("acre")) {
    return "FARM BUSINESS: 1 acre maize costs about N250k-N350k (seed, fertilizer, labour) and can give N500k-N700k if rain is good. Best profit now: Dry season vegetables (pepper, tomato, okra) near water, poultry layers, and cassava processing (garri). Always check Otukpo market price before selling - don't sell at farm gate cheap.";
  }
  if (text.includes("pepper") || text.includes("tomato") || text.includes("okra") || text.includes("vegetable") || text.includes("garden")) {
    return "VEGETABLES: Dry season is best for pepper, tomato, okra near water. Nursery 3-4 weeks, transplant in evening. Water morning/evening. Mulch to keep moisture. Stake tomato. Spray neem for insects weekly.";
  }
  if (text.includes("goat") || text.includes("pig") || text.includes("cow") || text.includes("livestock")) {
    return "LIVESTOCK: Goats need dry shelter, fresh grass + concentrate, deworm every 3 months. Pigs need clean pen, balanced feed, vaccine for swine fever. Give animals clean water daily and keep pen dry.";
  }
  return "I can help with: maize, cassava, rice, yam, poultry feed, catfish pond, weather/rain in Otukpo, yellow leaves treatment, soil/fertilizer, market price/business, vegetables, livestock. Please ask more specific like: 'how to grow maize' or 'will it rain in Otukpo tomorrow?'";
}

app.post("/api/ask", (req, res) => {
  const { question, department } = req.body;
  const answer = getAnswer(question || "", department || "");
  res.json({ answer, department: department || "General" });
});

app.listen(PORT, () => console.log("Server running on " + PORT));
