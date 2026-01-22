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

function isSetEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

export default function QuizBlock7() {
  const [checked, setChecked] = useState(false);

  // ✅ ВАЖНО: select должен быть темно-серый, а текст черный (по твоему требованию)
  const selectStyleDarkBgBlackText = {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "#ffffffff", // темно-серый
    color: "#000", // черный текст
    outline: "none",
  };

  // ===== Q1 (matching): reset flags -> description =====
  const q1RightItems = useMemo(
    () => [
      "Затрагивает историю коммитов, индекс и рабочий каталог. Все незакоммиченные изменения теряются",
      "Затрагивает историю коммитов и индекс. Рабочий каталог остаётся нетронутым.",
      "Затрагивает только историю коммитов. Рабочий каталог и индекс остаются нетронутыми.",
    ],
    []
  );

  const [q1, setQ1] = useState({
    hard: "",
    mixed: "",
    soft: "",
  });

  const q1Correct = useMemo(
    () => ({
      hard: q1RightItems[0],
      mixed: q1RightItems[1],
      soft: q1RightItems[2],
    }),
    [q1RightItems]
  );

  const q1Ok = q1.hard === q1Correct.hard && q1.mixed === q1Correct.mixed && q1.soft === q1Correct.soft;

  // ===== Q2 (checkboxes): HEAD~2 and HEAD^^ =====
  const q2Options = useMemo(() => ["git reset HEAD~2", "git reset HEAD^^"], []);
  const [q2, setQ2] = useState(new Set());
  const q2Correct = useMemo(() => new Set([0, 1]), []);
  const q2Ok = isSetEqual(q2, q2Correct);

  // ===== Q3 (radio): ORIG_HEAD =====
  const q3Options = useMemo(
    () => ["HEAD_BEFORE_TROUBLE", "LAST_HEAD", "CTRL_Z_HEAD", "ORIG_HEAD", "PREVIOUS_HEAD"],
    []
  );
  const [q3, setQ3] = useState(null);
  const q3Ok = q3 === 3;

  // ===== Q4 (radio): default reset is --mixed =====
  const q4Options = useMemo(() => ["--hard", "--mixed", "--soft"], []);
  const [q4, setQ4] = useState(null);
  const q4Ok = q4 === 1;

  // ===== Q5 (radio): revert creates new commit that undoes changes =====
  const q5Options = useMemo(
    () => [
      'Отмечает указанный коммит как ошибочный, добавляя к нему специальную метку "reverted".',
      "Создаёт новый коммит, который отменяет изменения указанного коммита, не удаляя его из истории.",
      "Удаляет коммит из истории, перезаписывая хеши последующих коммитов (опасная операция).",
      "Позволяет отредактировать сообщение указанного коммита без изменения его содержимого.",
      "Полностью удаляет указанный коммит и все связанные с ним изменения из рабочего каталога.",
    ],
    []
  );
  const [q5, setQ5] = useState(null);
  const q5Ok = q5 === 1;

  // ===== Общий результат =====
  const total = 5;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 7
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson7_passed", "1");
      window.dispatchEvent(new Event("lesson-progress-changed"));
    }
  }, [checked, score, total]);

  function toggleSet(setter, currentSet, idx) {
    const next = new Set(currentSet);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setter(next);
  }

  function resetAll() {
    setQ1({ hard: "", mixed: "", soft: "" });
    setQ2(new Set());
    setQ3(null);
    setQ4(null);
    setQ5(null);
    setChecked(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 7</h3>
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
        <h4 style={{ marginTop: 0 }}>1) Сопоставьте ключ в git reset с его описанием.</h4>

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>--hard</code></div>
            <select
              value={q1.hard}
              onChange={(e) => setQ1((p) => ({ ...p, hard: e.target.value }))}
              style={selectStyleDarkBgBlackText}
            >
              <option value="">— выберите —</option>
              {q1RightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>--mixed</code></div>
            <select
              value={q1.mixed}
              onChange={(e) => setQ1((p) => ({ ...p, mixed: e.target.value }))}
              style={selectStyleDarkBgBlackText}
            >
              <option value="">— выберите —</option>
              {q1RightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>--soft</code></div>
            <select
              value={q1.soft}
              onChange={(e) => setQ1((p) => ({ ...p, soft: e.target.value }))}
              style={selectStyleDarkBgBlackText}
            >
              <option value="">— выберите —</option>
              {q1RightItems.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
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
          2) Какая команда переместит HEAD на 2 коммита назад?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите все подходящие ответы</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q2Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={q2.has(idx)}
                onChange={() => toggleSet(setQ2, q2, idx)}
              />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q2Ok} />
          </div>
        )}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) Как называется служебный указатель, сохраняющий предыдущее положение HEAD перед опасными операциями?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q3Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q3" checked={q3 === idx} onChange={() => setQ3(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q3Ok} />
          </div>
        )}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>4) Какой ключ git reset используется по умолчанию?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q4Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q4" checked={q4 === idx} onChange={() => setQ4(idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q4Ok} />
          </div>
        )}
      </div>

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>5) Что делает команда git revert?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q5Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q5" checked={q5 === idx} onChange={() => setQ5(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && (
          <div style={{ marginTop: 12 }}>
            <ResultBadge ok={q5Ok} />
          </div>
        )}
      </div>
    </div>
  );
}
