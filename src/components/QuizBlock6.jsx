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

export default function QuizBlock6() {
  const [checked, setChecked] = useState(false);

  // Q1 (radio): git commit -a
  const q1Options = useMemo(
    () => [
      "git commit --tracked",
      "git do-magic",
      "git save -a",
      "git commit --lazy",
      "git do-my-job-for-me",
      "git commit -a",
      "git auto-commit",
    ],
    []
  );
  const [q1, setQ1] = useState(null);
  const q1Ok = q1 === 5;

  // Q2 (text): --amend
  const [q2, setQ2] = useState("");
  const q2Ok = normalizeCmd(q2) === "--amend";

  // Q3 (text): git show 1cb5d2
  const [q3, setQ3] = useState("");
  const q3Ok = normalizeCmd(q3) === "git show 1cb5d2";

  // Q4 (radio): -m is message
  const q4Options = useMemo(
    () => [
      "Для создания множественных (multiple) коммитов за один раз.",
      "Для добавления сообщения (message) к коммиту, без открытия текстового редактора.",
      "Для выполнения математических (math) вычислений перед коммитом.",
      "Для отправки email-уведомления (mail) о коммите всем участникам проекта.",
      "Для включения музыкального (musical) сигнала при успешном создании коммита.",
    ],
    []
  );
  const [q4, setQ4] = useState(null);
  const q4Ok = q4 === 1;

  const total = 4;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 6
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson6_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1(null);
    setQ2("");
    setQ3("");
    setQ4(null);
    setChecked(false);
  }

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
    width: "min(640px, 100%)",
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 6</h3>
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
          1) Какая команда выполняет два действия сразу: добавляет изменения tracked-файлов и делает коммит?
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
          2) Какой ключ добавит изменения в индексе в предыдущий коммит вместо создания нового?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите только ключ</div>

        <input
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
          placeholder="например: --version"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q2Ok} /></div>}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) Коммит имеет краткий идентификатор 1cb5d2. Какая команда покажет детальную информацию о нём?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>

        <input
          value={q3}
          onChange={(e) => setQ3(e.target.value)}
          placeholder="например: git ..."
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q3Ok} /></div>}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>4) Для чего используется ключ -m в команде git commit -m "..."?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q4Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q4" checked={q4 === idx} onChange={() => setQ4(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q4Ok} /></div>}
      </div>
    </div>
  );
}
