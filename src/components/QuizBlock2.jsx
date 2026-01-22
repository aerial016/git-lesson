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

export default function QuizBlock2() {
  // Q1 (radio): git --version
  const q1Options = useMemo(
    () => [
      'Бросьте кубик D20. Если выпало больше 10 — Git установлен. Если нет — бросайте еще раз.',
      "Введите в терминале своей операционной системы команду git --version",
      'Спросите у своей бабушки: "Устанавливала ли она KDE на FreeBSD?"',
      "Ложитесь поспать. Если вам приснится кошмар про мерж-конфликты — Git точно установлен.",
    ],
    []
  );
  const [q1, setQ1] = useState(null);
  const q1Correct = 1;

  // Q2 (text): git --help
  const [q2, setQ2] = useState("");
  const q2Correct = "git --help";

  // Q3 (radio): git-scm.com
  const q3Options = useMemo(() => ["pikabu.ru", "github.com", "git-scm.com", "git.org"], []);
  const [q3, setQ3] = useState(null);
  const q3Correct = 2;

  // Q4 (matching): files -> paths (Windows)
  const rightItems = useMemo(
    () => [
      "<Путь_к_репозиторию>\\.git\\config",
      "C:\\Program Files\\Git\\etc\\gitconfig",
      "%USERPROFILE%\\.gitconfig",
    ],
    []
  );

  const [q4, setQ4] = useState({
    local: "",
    system: "",
    global: "",
  });

  const q4Correct = useMemo(
    () => ({
      local: "<Путь_к_репозиторию>\\.git\\config",
      system: "C:\\Program Files\\Git\\etc\\gitconfig",
      global: "%USERPROFILE%\\.gitconfig",
    }),
    []
  );

  // Q5 (radio): git config --global user.email ...
  const q5Options = useMemo(
    () => [
      'git config --global user.email "nto@gmail.com"',
      'git config user.email "nto@gmail.com"',
      'git config --global user.name "nto@gmail.com"',
      'git config-global user.email "nto@gmail.com"',
    ],
    []
  );
  const [q5, setQ5] = useState(null);
  const q5Correct = 0;

  const [checked, setChecked] = useState(false);

  const q1Ok = q1 === q1Correct;
  const q2Ok = normalizeText(q2) === q2Correct;
  const q3Ok = q3 === q3Correct;
  const q4Ok =
    q4.local === q4Correct.local &&
    q4.system === q4Correct.system &&
    q4.global === q4Correct.global;
  const q5Ok = q5 === q5Correct;

  const total = 5;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 2, если всё верно
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson2_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1(null);
    setQ2("");
    setQ3(null);
    setQ4({ local: "", system: "", global: "" });
    setQ5(null);
    setChecked(false);
  }

  const selectStyle = {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255, 255, 255, 0.6)",
    color: "#000000ff",
    outline: "none",
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
            <h3 style={{ margin: 0 }}>Тест по уроку 2</h3>
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
        <h4 style={{ marginTop: 0 }}>1) Как проверить, что Git установлен на компьютере?</h4>
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
            <ResultBadge ok={q1Ok} text={q1Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>

      {/* Q2 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          2) Какой командой в терминале можно вызвать общую справку по Git (без уточнения конкретной команды)?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>

        <input
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
          placeholder='например: git --version'
          style={inputStyle}
        />

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q2Ok} text={q2Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>3) На каком сайте можно скачать официальный инсталлятор Git?</h4>
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
        <h4 style={{ marginTop: 0 }}>4) Сопоставьте файлы настроек Git и их расположение (Windows)</h4>
        <div style={{ opacity: 0.85, marginBottom: 12 }}>
          Для каждого типа выберите правильный путь
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 10, alignItems: "center" }}>
            <div>Локальные настройки (для конкретного репозитория)</div>
            <select
              value={q4.local}
              onChange={(e) => setQ4((p) => ({ ...p, local: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {rightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 10, alignItems: "center" }}>
            <div>Системные настройки Git (для всех пользователей)</div>
            <select
              value={q4.system}
              onChange={(e) => setQ4((p) => ({ ...p, system: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {rightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 10, alignItems: "center" }}>
            <div>Глобальные настройки (для текущего пользователя)</div>
            <select
              value={q4.global}
              onChange={(e) => setQ4((p) => ({ ...p, global: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {rightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q4Ok} text={q4Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          5) Какая команда настраивает глобальный email пользователя Git (для всех проектов)?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q5Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q5" checked={q5 === idx} onChange={() => setQ5(idx)} />
              <span>
                <code style={{ color: "#fff" }}>{t}</code>
              </span>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q5Ok} text={q5Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>
    </div>
  );
}
