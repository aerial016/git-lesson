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

export default function QuizBlock9() {
  const [checked, setChecked] = useState(false);

  // Q1 (radio)
  const q1Options = useMemo(
    () => [
      "Отправляет файл old.txt на почту Линусу Торвальдсу с просьбой переименовать его в new.txt.",
      "Показывает разницу между файлами old.txt и new.txt без внесения изменений.",
      "Создает копию файла old.txt с именем new.txt, но оставляет оба файла в репозитории.",
      "Переименовывает файл old.txt на new.txt в рабочем каталоге и автоматически обновляет индекс Git, готовя это изменение к коммиту.",
      "Удаляет файл old.txt и создает новый пустой файл new.txt.",
    ],
    []
  );
  const [q1, setQ1] = useState(null);
  const q1Ok = q1 === 3;

  // Q2 (text)
  const [q2, setQ2] = useState("");
  const q2Ok = normalizeCmd(q2) === "git mv page2.html contacts.html";

  // Q3 (text)
  const [q3, setQ3] = useState("");
  // допускаем оба варианта: "git mv contacts.html web_pages" и "git mv contacts.html web_pages/"
  const q3Norm = normalizeCmd(q3);
  const q3Ok = q3Norm === "git mv contacts.html web_pages" || q3Norm === "git mv contacts.html web_pages/";

  const total = 3;
  const score = [q1Ok, q2Ok, q3Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 9
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson9_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1(null);
    setQ2("");
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
    width: "min(720px, 100%)",
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 9</h3>
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
        <h4 style={{ marginTop: 0 }}>1) Что делает команда <code style={{ color: "#fff" }}>git mv old.txt new.txt</code>?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q1Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q1" checked={q1 === idx} onChange={() => setQ1(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q1Ok} />
          </div>
        )}
      </div>

      {/* Q2 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          2) Переименуйте <code style={{ color: "#fff" }}>page2.html</code> в <code style={{ color: "#fff" }}>contacts.html</code> одной командой так,
          чтобы Git подготовил изменения в индексе.
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>

        <input
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
          placeholder='например: git ....'
          style={inputStyle}
        />

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q2Ok} />
          </div>
        )}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) Переместите <code style={{ color: "#fff" }}>contacts.html</code> в папку <code style={{ color: "#fff" }}>web_pages</code> одной командой
          так, чтобы Git подготовил изменения в индексе.
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>

        <input
          value={q3}
          onChange={(e) => setQ3(e.target.value)}
          placeholder='например: git ...'
          style={inputStyle}
        />

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q3Ok} />
          </div>
        )}
      </div>
    </div>
  );
}
