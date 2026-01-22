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

function normalizeLine(s) {
  // нормализуем ввод для .gitignore строк (пробелы и регистр не важны)
  return String(s ?? "")
    .trim()
    .replace(/\u00A0/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeCmd(s) {
  return String(s ?? "")
    .trim()
    .replace(/\u00A0/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export default function QuizBlock13() {
  const [checked, setChecked] = useState(false);

  // Q1 (text): filename .gitignore
  const [q1, setQ1] = useState("");
  const q1Ok = normalizeLine(q1) === ".gitignore";

  // Q2 (text): ignore *.bin
  const [q2, setQ2] = useState("");
  const q2Ok = normalizeLine(q2) === "*.bin";

  // Q3 (text): unignore file
  const [q3, setQ3] = useState("");
  const q3Ok = normalizeLine(q3) === "!important_file.bin";

  // Q4 (text): ignore temp folder
  const [q4, setQ4] = useState("");
  const q4Ok = normalizeLine(q4) === "temp/*";

  // Q5 (radio): global excludesfile command
  const q5Options = useMemo(
    () => [
      'git config --global ignore.file ~/.gitignore_global',
      'git add-global-ignore ~/.gitignore_global',
      'git config --global core.excludesfile ~/.gitignore_global',
      'git global-ignore ~/.gitignore_global',
    ],
    []
  );
  const [q5, setQ5] = useState(null);
  const q5Ok = q5 === 2;

  const total = 5;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 13
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson13_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1("");
    setQ2("");
    setQ3("");
    setQ4("");
    setQ5(null);
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
            <h3 style={{ margin: 0 }}>Тест по уроку 13</h3>
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
          1) Напишите название конфигурационного файла, который указывает Git, какие файлы и папки не нужно отслеживать.
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите текст</div>

        <input
          value={q1}
          onChange={(e) => setQ1(e.target.value)}
          placeholder="например: .js"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q1Ok} /></div>}
      </div>

      {/* Q2 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          2) Какую строку нужно добавить в <code style={{ color: "#fff" }}>.gitignore</code>, чтобы Git перестал отслеживать файлы с расширением <code style={{ color: "#fff" }}>.bin</code>?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите строку</div>

        <input
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
          placeholder="например: asd.js"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q2Ok} /></div>}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) В <code style={{ color: "#fff" }}>.gitignore</code> есть правило, игнорирующее все <code style={{ color: "#fff" }}>.bin</code>.
          Но файл <code style={{ color: "#fff" }}>important_file.bin</code> нужно отслеживать. Какую строку добавить?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите строку</div>

        <input
          value={q3}
          onChange={(e) => setQ3(e.target.value)}
          placeholder="например: asd.js"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q3Ok} /></div>}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          4) Какую строку нужно добавить в <code style={{ color: "#fff" }}>.gitignore</code>, чтобы Git перестал отслеживать все файлы в папке <code style={{ color: "#fff" }}>temp</code>?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите строку</div>

        <input
          value={q4}
          onChange={(e) => setQ4(e.target.value)}
          placeholder='например: papka?'
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q4Ok} /></div>}
      </div>

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          5) Какая команда создает глобальный файл исключений для всех репозиториев на компьютере (глобальный ignore), который применяется ко всем Git-репозиториям?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q5Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q5" checked={q5 === idx} onChange={() => setQ5(idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q5Ok} /></div>}
      </div>
    </div>
  );
}
