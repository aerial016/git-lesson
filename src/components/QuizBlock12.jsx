import React, { useEffect, useMemo, useState } from "react";

const card = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: 16,
};

const btn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
};

function ResultBadge({ ok }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 13,
        border: `1px solid ${ok ? "rgba(80, 220, 140, .6)" : "rgba(255, 90, 90, .6)"}`,
        background: ok ? "rgba(80, 220, 140, .15)" : "rgba(255, 90, 90, .12)",
        color: "#fff",
      }}
    >
      {ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."}
    </span>
  );
}

function normalizeCmd(s) {
  return String(s ?? "")
    .trim()
    .replace(/\u00A0/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export default function QuizBlock12() {
  const [checked, setChecked] = useState(false);

  // Q1
  const q1Options = useMemo(
    () => [
      "git dejavu",
      "git references-log",
      "git oops-log",
      "git reflog",
      "git time-machine",
      "git history",
      "git log",
    ],
    []
  );
  const [q1, setQ1] = useState(null);
  const q1Ok = q1 === 6; // git log

  // Q2
  const q2Options = useMemo(
    () => [
      "git oops-log",
      "git log",
      "git dejavu",
      "git history",
      "git reflog",
      "git time-machine",
      "git references-log",
    ],
    []
  );
  const [q2, setQ2] = useState(null);
  const q2Ok = q2 === 4; // git reflog

  // Q3 (text) — ответ строго "gc"
  const [q3, setQ3] = useState("");
  const q3Ok = normalizeCmd(q3) === "gc";

  const total = 3;
  const score = [q1Ok, q2Ok, q3Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 12
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson12_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1(null);
    setQ2(null);
    setQ3("");
    setChecked(false);
  }

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
    width: "min(520px, 100%)",
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 12</h3>
            <div style={{ opacity: 0.85, marginTop: 6 }}>Ответь на вопросы и нажми “Проверить”.</div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {checked && (
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontSize: 13,
                  border: `1px solid ${
                    score === total ? "rgba(80, 220, 140, .6)" : "rgba(255, 90, 90, .6)"
                  }`,
                  background: score === total ? "rgba(80, 220, 140, .15)" : "rgba(255, 90, 90, .12)",
                  color: "#fff",
                }}
              >
                {`Результат: ${score}/${total}`}
              </span>
            )}

            <button style={btn} onClick={() => setChecked(true)}>
              Проверить
            </button>
            <button style={btn} onClick={resetAll}>
              Сбросить
            </button>
          </div>
        </div>
      </div>

      {/* Q1 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          1) К какой фиче Git относятся характеристики: история коммитов текущей ветки, только достижимые коммиты,
          анализ истории, может потерять информацию после удаления веток или reset --hard?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q1Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q1" checked={q1 === idx} onChange={() => setQ1(idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q1Ok} /></div>}
      </div>

      {/* Q2 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          2) К какой фиче Git относятся характеристики: локальная история перемещения HEAD и ссылок,
          все действия (commit/checkout/reset/merge), восстановление потерянных коммитов, хранит историю 90 дней?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q2Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q2" checked={q2 === idx} onChange={() => setQ2(idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q2Ok} /></div>}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) Какой командой можно запустить сборщик мусора Git?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>
          Пример: <code style={{ color: "#fff" }}>status</code> / <code style={{ color: "#fff" }}>log</code>
        </div>

        <input
          value={q3}
          onChange={(e) => setQ3(e.target.value)}
          placeholder="введите команду…"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q3Ok} /></div>}
      </div>
    </div>
  );
}
