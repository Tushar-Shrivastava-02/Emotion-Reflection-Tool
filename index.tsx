import React, { useState } from "react";
import styles from "../styles/EmotionCard.module.css";

type EmotionResult = {
  emotion: string;
  confidence: number;
};

export default function Home() {
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reflection }),
      });
      if (!response.ok) {
        throw new Error("API Error");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Emotion Reflection Tool</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your reflection here..."
          rows={4}
          required
          className={styles.textarea}
        />
        <button type="submit" disabled={loading || reflection.length < 3} className={styles.button}>
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
      {result && (
        <div className={styles.card}>
          <h2>Emotion Analysis</h2>
          <p>
            <strong>Emotion:</strong> {result.emotion}
          </p>
          <p>
            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(0)}%
          </p>
        </div>
      )}
    </div>
  );
}