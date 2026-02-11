import { useState, useEffect } from "react";

const CBUAE_ENDPOINT =
  "https://www.centralbank.ae/umbraco/Surface/EiborHome/GetEiborData";

const FALLBACK_RATES = { threeMonth: 3.525, sixMonth: 3.534 };

interface EiborRates {
  threeMonth: number;
  sixMonth: number;
  isLive: boolean;
  lastUpdated: Date | null;
}

async function fetchEiborRates(): Promise<EiborRates> {
  const res = await fetch(CBUAE_ENDPOINT);
  const text = await res.text();

  const match = text.match(/var\s+headerDataEn\s*=\s*\[([\d.,\s]+)\]/);
  if (!match) throw new Error("Failed to parse EIBOR data");

  const values = match[1].split(",").map((v) => parseFloat(v.trim()));
  // Index mapping: [O/N, 1W, 1M, 3M, 6M, 1Y]
  const threeMonth = values[3];
  const sixMonth = values[4];

  if (
    !Number.isFinite(threeMonth) || threeMonth <= 0 || threeMonth > 20 ||
    !Number.isFinite(sixMonth) || sixMonth <= 0 || sixMonth > 20
  ) {
    throw new Error("EIBOR values out of expected range");
  }

  return { threeMonth, sixMonth, isLive: true, lastUpdated: new Date() };
}

export function useEiborRates(): EiborRates {
  const [rates, setRates] = useState<EiborRates>({
    ...FALLBACK_RATES,
    isLive: false,
    lastUpdated: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetchEiborRates()
      .then((data) => {
        if (!cancelled) setRates(data);
      })
      .catch(() => {
        // Fallback rates already set as default
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return rates;
}
