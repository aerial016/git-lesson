import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

function isLessonPassed(n) {
  return localStorage.getItem(`lesson${n}_passed`) === "1";
}

export default function Home() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onChanged = () => setTick((t) => t + 1);
    window.addEventListener("lesson-progress-changed", onChanged);
    window.addEventListener("storage", onChanged);
    return () => {
      window.removeEventListener("lesson-progress-changed", onChanged);
      window.removeEventListener("storage", onChanged);
    };
  }, []);

  const lessons = useMemo(() => {
    // tick нужен, чтобы пересчитывать при событии
    void tick;
    return Array.from({ length: 14 }, (_, i) => {
      const n = i + 1;
      return { n, passed: isLessonPassed(n) };
    });
  }, [tick]);

  const passedCount = lessons.filter((x) => x.passed).length;

  const card = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 16,
  };

  const linkStyleBase = {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    textDecoration: "none",
    background: "rgba(255,255,255,0.08)",
    fontSize: 14,
  };

  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Главная</h2>
        <p style={{ opacity: 0.9, marginBottom: 0 }}>
          Выбери урок сверху и пройди тест. После успешного прохождения урок отмечается как выполненный.
        </p>
      </div>

      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Прогресс</h3>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Пройдено: <b>{passedCount}/14</b>
            </div>
          </div>

          <div style={{ minWidth: 220, flex: "0 0 auto" }}>
            <div
              style={{
                height: 10,
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.round((passedCount / 14) * 100)}%`,
                  background: "rgba(80, 220, 140, .65)",
                }}
              />
            </div>
            <div style={{ opacity: 0.75, marginTop: 8, fontSize: 12 }}>
              {Math.round((passedCount / 14) * 100)}%
            </div>
          </div>
        </div>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Список уроков</h3>

        <div style={{ display: "grid", gap: 10 }}>
          {lessons.map(({ n, passed }) => (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: passed ? "rgba(80, 220, 140, .10)" : "rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 18, width: 26, textAlign: "center" }}>
                  {passed ? "✅" : "⬜"}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>
                    Урок {n} {passed ? "— пройден" : "— не пройден"}
                  </div>
                  <div style={{ opacity: 0.75, fontSize: 12 }}>
                    {passed ? "Можно идти дальше или повторить." : "Открой урок и пройди тест."}
                  </div>
                </div>
              </div>

              <NavLink
                to={`/lesson/${n}`}
                style={{
                  ...linkStyleBase,
                  background: passed ? "rgba(80, 220, 140, .18)" : "rgba(255,255,255,0.08)",
                  border: passed ? "1px solid rgba(80, 220, 140, .45)" : "1px solid rgba(255,255,255,0.18)",
                }}
              >
                Перейти
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
