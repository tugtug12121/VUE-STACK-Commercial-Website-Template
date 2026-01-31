import express from "express"
import cors from "cors"

// Node 18+ has fetch built-in — no import needed

const app = express()
app.use(cors())
app.use(express.json())

// ---------------------------------------------
// REGION MAP (fallback + proximity)
// ---------------------------------------------
const regionMap = {
  "nsw-hunter": ["nsw-hunter", "nsw-sydney", "other"],
  "nsw-sydney": ["nsw-sydney", "nsw-hunter", "other"],
  "vic-metro": ["vic-metro", "other"],
  "qld-se": ["qld-se", "other"],
  "other": ["other", "nsw-sydney", "vic-metro", "qld-se"]
}

// ---------------------------------------------
// REAL DATA GOES HERE
// ---------------------------------------------
// Replace these with REAL wreckers YOU choose.
const wreckers = [
  {
    id: 1,
    name: "YOUR REAL WRECKER NAME",
    region: "nsw-hunter",
    rating: 4.9,
    ratingHistory: [4.8, 4.9, 5.0],
    parts: {
      engines: 8,
      transmissions: 3,
      bodyPanels: 22,
      electronics: 41
    },
    phone: "YOUR REAL PHONE",
    email: "YOUR REAL EMAIL"
  },
  {
    id: 2,
    name: "YOUR REAL WRECKER NAME",
    region: "nsw-sydney",
    rating: 4.7,
    ratingHistory: [4.6, 4.7, 4.8],
    parts: {
      engines: 12,
      transmissions: 5,
      bodyPanels: 30,
      electronics: 55
    },
    phone: "YOUR REAL PHONE",
    email: "YOUR REAL EMAIL"
  }
]

// ---------------------------------------------
// AUTO-DETECT REGION BY IP
// ---------------------------------------------
async function detectRegion(ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await res.json()

    const state = (data.region || "").toLowerCase()

    if (state.includes("new south wales")) return "nsw-sydney"
    if (state.includes("victoria")) return "vic-metro"
    if (state.includes("queensland")) return "qld-se"

    return "other"
  } catch {
    return "other"
  }
}

// ---------------------------------------------
// ADVANCED SEARCH FUNCTION
// ---------------------------------------------
function findBestWreckers(location) {
  const searchRegions = regionMap[location] || ["other"]

  let results = wreckers.filter(w => searchRegions.includes(w.region))

  results.sort((a, b) => {
    const aPriority = searchRegions.indexOf(a.region)
    const bPriority = searchRegions.indexOf(b.region)

    if (aPriority !== bPriority) return aPriority - bPriority
    return b.rating - a.rating
  })

  return results
}

// ---------------------------------------------
// REAL-TIME RATING UPDATE ENDPOINT
// ---------------------------------------------
app.post("/api/wreckers/rate", (req, res) => {
  const { id, rating } = req.body

  const w = wreckers.find(w => w.id === id)
  if (!w) return res.status(404).json({ error: "Wrecker not found" })

  w.ratingHistory.push(rating)
  w.rating = Number(
    (w.ratingHistory.reduce((a, b) => a + b, 0) / w.ratingHistory.length).toFixed(2)
  )

  res.json({ success: true, newRating: w.rating })
})

// ---------------------------------------------
// MAIN ENDPOINT — SMART MATCHING + IP REGION
// ---------------------------------------------
app.get("/api/wreckers", async (req, res) => {
  let location = req.query.location

  // Auto-detect region if none provided
  if (!location) {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    location = await detectRegion(ip)
  }

  const results = findBestWreckers(location)

  res.json({
    autoDetectedRegion: location,
    count: results.length,
    wreckers: results
  })
})

// ---------------------------------------------
// START SERVER
// ---------------------------------------------
const PORT = 3001
app.listen(PORT, () => console.log(`API running on port ${PORT}`))
