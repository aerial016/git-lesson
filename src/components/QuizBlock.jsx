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

export default function QuizBlock() {
  // Q1 (checkboxes)
  const q1Options = [
    "Иметь одновременно только одну правильно работающую версию кода",
    "Не иметь возможность вернуться к прошлым версиям кода",
    "Иметь возможность откатываться к прошлым версиям кода",
    "Определять автора кода",
    "Скрывать автора кода",
    "Иметь одновременно несколько версий кода",
  ];
  const q1Correct = useMemo(() => new Set([2, 3, 5]), []);
  const [q1, setQ1] = useState(new Set());

  // Q2 (radio)
  const [q2, setQ2] = useState(null); // "true" | "false"
  const q2Correct = "false"; // Не верно

  // Q3 (checkboxes)
  const q3Options = [
    "При политической агитации избирателей",
    "В электронном документообороте",
    "На допросе в суде",
    "При готовке борща",
    "В программировании",
    "При управлении конфигурациями",
    "Для написания статей",
    "В разговорах в баре",
  ];
  const q3Correct = useMemo(() => new Set([1, 4, 5, 6]), []);
  const [q3, setQ3] = useState(new Set());

  // Q4 (select)
  const [q4, setQ4] = useState("");
  const q4Correct = "командной";

  // Q5 (matching)
  const rightItems = ["Git, Mercurial", "Revision Control System", "SVN, Subversion"];
  const [q5, setQ5] = useState({
    distributed: "",
    local: "",
    centralized: "",
  });
  const q5Correct = {
    distributed: "Git, Mercurial",
    local: "Revision Control System",
    centralized: "SVN, Subversion",
  };

  const [checked, setChecked] = useState(false);

  function toggleSet(setter, currentSet, idx) {
    const next = new Set(currentSet);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setter(next);
  }

  function isSetEqual(a, b) {
    if (a.size !== b.size) return false;
    for (const x of a) if (!b.has(x)) return false;
    return true;
  }

  const q1Ok = isSetEqual(q1, q1Correct);
  const q2Ok = q2 === q2Correct;
  const q3Ok = isSetEqual(q3, q3Correct);
  const q4Ok = q4 === q4Correct;
  const q5Ok =
    q5.distributed === q5Correct.distributed &&
    q5.local === q5Correct.local &&
    q5.centralized === q5Correct.centralized;

  const total = 5;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 1, если всё верно
  useEffect(() => {
    if (!checked) return;

    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson1_passed", "1");
      // ✅ сообщаем приложению/главной/навигации что прогресс обновился
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function resetAll() {
    setQ1(new Set());
    setQ2(null);
    setQ3(new Set());
    setQ4("");
    setQ5({ distributed: "", local: "", centralized: "" });
    setChecked(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 1</h3>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Отметь ответы и нажми “Проверить”.
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
        <h4 style={{ marginTop: 0 }}>1) Какие задачи решает система контроля версий?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите все подходящие ответы</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q1Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={q1.has(idx)}
                onChange={() => toggleSet(setQ1, q1, idx)}
              />
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
          2) Верно ли, что СКВ используют исключительно программисты?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <label style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
          <input
            type="radio"
            name="q2"
            checked={q2 === "false"}
            onChange={() => setQ2("false")}
          />
          <span>Не верно</span>
        </label>

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="radio"
            name="q2"
            checked={q2 === "true"}
            onChange={() => setQ2("true")}
          />
          <span>Верно</span>
        </label>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge
              ok={q2Ok}
              text={q2Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."}
            />
          </div>
        )}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) В каких сферах используются системы контроля версий?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите все подходящие ответы</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q3Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={q3.has(idx)}
                onChange={() => toggleSet(setQ3, q3, idx)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge
              ok={q3Ok}
              text={
                q3Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."
              }
            />
          </div>
        )}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>4) Заполните пропуски</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>
          Система контроля версий имеет наибольшую актуальность в{" "}
          <select
            value={q4}
            onChange={(e) => setQ4(e.target.value)}
            style={{
              margin: "0 8px",
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255, 255, 255, 0.76)",
              color: "#000000ff",
              outline: "none",
            }}
          >
            <option value="">— выберите —</option>
            <option value="индивидуальной">индивидуальной</option>
            <option value="командной">командной</option>
            <option value="случайной">случайной</option>
          </select>
          разработке.
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q4Ok} text={q4Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>5) Сопоставьте тип и название СКВ</h4>

        <div style={{ display: "grid", gap: 10 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div>Распределенная СКВ</div>
            <select
              value={q5.distributed}
              onChange={(e) => setQ5((p) => ({ ...p, distributed: e.target.value }))}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                outline: "none",
              }}
            >
              <option value="">— выберите —</option>
              {rightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div>Локальная СКВ</div>
            <select
              value={q5.local}
              onChange={(e) => setQ5((p) => ({ ...p, local: e.target.value }))}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                outline: "none",
              }}
            >
              <option value="">— выберите —</option>
              {rightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div>Централизованная СКВ</div>
            <select
              value={q5.centralized}
              onChange={(e) => setQ5((p) => ({ ...p, centralized: e.target.value }))}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                outline: "none",
              }}
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
            <ResultBadge ok={q5Ok} text={q5Ok ? "Всё правильно." : "Есть ошибки. Попробуй ещё раз."} />
          </div>
        )}
      </div>
    </div>
  );
}
