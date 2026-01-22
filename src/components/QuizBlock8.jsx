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

export default function QuizBlock8() {
  const [checked, setChecked] = useState(false);

  // ✅ требование: список (select) со светло-серым фоном
  const selectStyleLight = {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "#e6e6e6", // светло-серый
    color: "#000",         // читаемо
    outline: "none",
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
    width: "min(640px, 100%)",
  };

  // Q1 (radio)
  const q1Options = useMemo(
    () => [
      "Разницы нет — это абсолютно одинаковые команды с разными названиями.",
      "git rm работает в 100 раз быстрее, потому что оптимизирован для работы с Git-репозиториями.",
      "rm не может удалить файлы, которые отслеживаются Git, а git rm — может.",
      "rm удаляет файл только из файловой системы, а git rm удаляет файл и из файловой системы, и из индекса Git (staging area), готовя это изменение к коммиту.",
      "rm удаляет файлы навсегда, а git rm перемещает их в корзину, откуда их можно восстановить.",
    ],
    []
  );
  const [q1, setQ1] = useState(null);
  const q1Ok = q1 === 3;

  // Q2 (text): -f
  const [q2, setQ2] = useState("");
  const q2Ok = normalizeCmd(q2) === "-r";

  // Q3 (text): -r
  const [q3, setQ3] = useState("");
  const q3Ok = normalizeCmd(q3) === "-n";

  // Q4 (radio): git clean -f
  const q4Options = useMemo(
    () => ["git clean -f", "git reset --hard", "git remove --all", "git rm --untracked", "rm -rf *"],
    []
  );
  const [q4, setQ4] = useState(null);
  const q4Ok = q4 === 0;

  // Q5 (text): -n
  const [q5, setQ5] = useState("");
  const q5Ok = normalizeCmd(q5) === "-n";

  const total = 5;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 8
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson8_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1(null);
    setQ2("");
    setQ3("");
    setQ4(null);
    setQ5("");
    setChecked(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 8</h3>
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
        <h4 style={{ marginTop: 0 }}>1) В чём ключевая разница между rm и git rm?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q1Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q1" checked={q1 === idx} onChange={() => setQ1(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q1Ok} /></div>}
      </div>

      {/* Q2 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          2) Какой ключ используется в git rm для форсированного удаления файла (если его изменения есть в индексе)?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите ключ</div>

        <input value={q2} onChange={(e) => setQ2(e.target.value)} placeholder="например: -f" style={inputStyle} />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q2Ok} /></div>}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>3) Какой ключ используется в git rm для удаления директории?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите ключ</div>

        <input value={q3} onChange={(e) => setQ3(e.target.value)} placeholder="например: -r" style={inputStyle} />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q3Ok} /></div>}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>4) Какая команда удаляет неотслеживаемые файлы из рабочего каталога?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        {/* тут показываю как выглядит select со светло-серым фоном (по требованию) */}
        <select
          value={q4 ?? ""}
          onChange={(e) => setQ4(e.target.value === "" ? null : Number(e.target.value))}
          style={selectStyleLight}
        >
          <option value="">— выберите —</option>
          {q4Options.map((t, idx) => (
            <option key={t} value={idx}>
              {t}
            </option>
          ))}
        </select>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q4Ok} /></div>}
      </div>

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          5) Какой ключ в git clean делает “холостой прогон” (показывает что было бы удалено)?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите ключ</div>

        <input value={q5} onChange={(e) => setQ5(e.target.value)} placeholder="например: -n" style={inputStyle} />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q5Ok} /></div>}
      </div>
    </div>
  );
}
