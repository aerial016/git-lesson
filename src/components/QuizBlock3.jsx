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

function ResultBadge({ ok, text }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 13,
        border: `1px solid ${
          ok ? "rgba(80, 220, 140, .6)" : "rgba(255, 90, 90, .6)"
        }`,
        background: ok ? "rgba(80, 220, 140, .15)" : "rgba(255, 90, 90, .12)",
        color: "#fff",
      }}
    >
      {text}
    </span>
  );
}

function normalizeText(s) {
  return String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

export default function QuizBlock3() {
  // Q1 (matching): Alt + L
  const leftKeys = useMemo(() => ["alt", "shift", "ctrl"], []);
  const rightKeys = useMemo(() => ["C", "D", "L", "K"], []);

  const [q1, setQ1] = useState({ first: "", second: "" });
  const q1Ok = q1.first === "ctrl" && q1.second === "L";

  // Q2 (radio): .git
  const q2Options = useMemo(
    () => [".gitignore", ".github", ".config", ".versions", ".metadata", ".git", ".cache"],
    []
  );
  const [q2, setQ2] = useState(null);
  const q2Ok = q2 === 5;

  // Q3 (radio): delete .git -> lose history
  const q3Options = useMemo(
    () => [
      "Файлы проекта удалятся вместе с папкой, так как они являются её частью.",
      "Проект превратится в обычную папку с файлами, и вся история коммитов, ветки и настройки Git будут безвозвратно утеряны.",
      "Git автоматически создаст новую папку .git с чистой историей, сохранив при этом все текущие файлы.",
      "Git заметит потерю и восстановит историю из удалённого репозитория (например, с GitHub).",
      "Система выдаст ошибку, так как папка .git защищена от удаления операционной системой.",
    ],
    []
  );
  const [q3, setQ3] = useState(null);
  const q3Ok = q3 === 1;

  // Q4 (text): git init
  const [q4, setQ4] = useState("");
  const q4Ok = normalizeText(q4) === "git init";

  const [checked, setChecked] = useState(false);

  const total = 4;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 3
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson3_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1({ first: "", second: "" });
    setQ2(null);
    setQ3(null);
    setQ4("");
    setChecked(false);
  }

  const selectStyle = {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255, 255, 255, 0.8)",
    color: "#000000ff",
    outline: "none",
    minWidth: 140,
  };

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
            <h3 style={{ margin: 0 }}>Тест по уроку 3</h3>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Ответь на вопросы и нажми “Проверить”.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {checked && <ResultBadge ok={score === total} text={`Результат: ${score}/${total}`} />}
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
        <h4 style={{ marginTop: 0 }}>1) Каким сочетанием клавиш можно очистить экран в Git Bash?</h4>
        <div style={{ opacity: 0.85, marginBottom: 12 }}>
          Заполните пропуски (выберите из списков)
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <select
            value={q1.first}
            onChange={(e) => setQ1((p) => ({ ...p, first: e.target.value }))}
            style={selectStyle}
          >
            <option value="">— выберите —</option>
            {leftKeys.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>

          <span style={{ opacity: 0.9 }}>+</span>

          <select
            value={q1.second}
            onChange={(e) => setQ1((p) => ({ ...p, second: e.target.value }))}
            style={selectStyle}
          >
            <option value="">— выберите —</option>
            {rightKeys.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q1Ok} text={q1Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>

      {/* Q2 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          2) Какая скрытая папка в Git репозитории содержит всю служебную информацию и историю изменений проекта?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q2Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q2" checked={q2 === idx} onChange={() => setQ2(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q2Ok} text={q2Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>3) Что произойдет, если удалить папку .git в корне репозитория?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q3Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q3" checked={q3 === idx} onChange={() => setQ3(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q3Ok} text={q3Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>4) Какая команда создает новый Git репозиторий?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>

        <input
          value={q4}
          onChange={(e) => setQ4(e.target.value)}
          placeholder="например: git init"
          style={inputStyle}
        />

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q4Ok} text={q4Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>
    </div>
  );
}
