# Monona Coach Website

https://monona-sports.com

## Google Analytics (GA4)

1. Go to [Google Analytics](https://analytics.google.com/) → **Admin** → **Create account** (e.g. "Monona Sports").
2. **Create property** → name: `Monona Coach Website`.
3. Add a **Web** data stream with URL `https://monona-sports.com`.
4. Copy the **Measurement ID** (`G-XXXXXXXXXX`) from the stream details.
5. Paste it into `analytics.js` as `GA_MEASUREMENT_ID` (replace the placeholder).
6. (Optional) Enable **Enhanced measurement** on the data stream for scroll and outbound click tracking.

After deploy, verify events in **Admin → DebugView** and the **Realtime** report.
