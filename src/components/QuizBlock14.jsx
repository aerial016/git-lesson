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

function isSetEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

export default function QuizBlock14() {
  const [checked, setChecked] = useState(false);

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
    width: "min(760px, 100%)",
  };

  // Q1 (radio) — инициализация репозитория
  const q1Options = useMemo(
    () => [
      "git start",
      "git init",
      "git begin",
      "git create repo",
      "git new",
    ],
    []
  );
  const [q1, setQ1] = useState(null);
  const q1Ok = q1 === 1;

  // Q2 (text) — проверка git установлен
  const [q2, setQ2] = useState("");
  const q2Ok = normalizeCmd(q2) === "git --version";

  // Q3 (checkbox) — индексация/следующий коммит (staged/cached)
  const q3Options = useMemo(() => ["--cached", "--staged", "--stage", "--stat", "--stash"], []);
  const q3Correct = useMemo(() => new Set([0, 1]), []);
  const [q3, setQ3] = useState(new Set());
  const q3Ok = isSetEqual(q3, q3Correct);

  // Q4 (radio) — revert
  const q4Options = useMemo(
    () => [
      "Удаляет коммит из истории, переписывая хэши последующих коммитов.",
      "Создаёт новый коммит, который отменяет изменения указанного коммита, не удаляя его из истории.",
      "Перемещает HEAD на старый коммит и удаляет изменения из рабочей директории.",
      "Просто меняет сообщение коммита без изменения содержимого.",
    ],
    []
  );
  const [q4, setQ4] = useState(null);
  const q4Ok = q4 === 1;

  // Q5 (text) — показать reflog
  const [q5, setQ5] = useState("");
  const q5Ok = normalizeCmd(q5) === "git reflog";

  // Q6 (text) — игнор всех .log
  const [q6, setQ6] = useState("");
  const q6Ok = normalizeCmd(q6) === "*.log";

  // Q7 (radio) — linux: текущая директория
  const q7Options = useMemo(() => ["whereami", "pwd", "ls -p", "cd .", "dir"], []);
  const [q7, setQ7] = useState(null);
  const q7Ok = q7 === 1;

  // Q8 (text) — linux: список файлов включая скрытые (таблично)
  const [q8, setQ8] = useState("");
  const q8Ok = normalizeCmd(q8) === "ls -la";

  // Q9 (checkbox) — linux: работа с файлами/каталогами
  const q9Options = useMemo(
    () => [
      "mkdir",
      "touch",
      "rm",
      "mv",
      "git rm",
      "cat",
      "nano",
      "chmod",
      "git mv",
    ],
    []
  );
  // тут правильные — linux команды: mkdir, touch, rm, mv, cat, nano, chmod
  const q9Correct = useMemo(() => new Set([0, 1, 2, 3, 5, 6, 7]), []);
  const [q9, setQ9] = useState(new Set());
  const q9Ok = isSetEqual(q9, q9Correct);

  // Q10 (text) — просмотр истории в кратком виде
  const [q10, setQ10] = useState("");
  const q10Ok = normalizeCmd(q10) === "git log --oneline";

  const total = 10;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok, q6Ok, q7Ok, q8Ok, q9Ok, q10Ok].filter(Boolean).length;

  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson14_passed", "1");
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
    setQ1(null);
    setQ2("");
    setQ3(new Set());
    setQ4(null);
    setQ5("");
    setQ6("");
    setQ7(null);
    setQ8("");
    setQ9(new Set());
    setQ10("");
    setChecked(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Финальный тест (урок 14)</h3>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Смешанный тест: Git + Linux. Нажми “Проверить” для результата.
            </div>
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
        <h4 style={{ marginTop: 0 }}>1) Какая команда создаёт новый Git-репозиторий в текущей папке?</h4>
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
        <h4 style={{ marginTop: 0 }}>2) Как проверить, что Git установлен?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>
        <input value={q2} onChange={(e) => setQ2(e.target.value)} placeholder="например: git " style={inputStyle} />
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q2Ok} /></div>}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) Какие ключи в git diff показывают разницу между индексом (staging) и последним коммитом (HEAD)?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите все подходящие ответы</div>
        <div style={{ display: "grid", gap: 8 }}>
          {q3Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="checkbox" checked={q3.has(idx)} onChange={() => toggleSet(setQ3, q3, idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q3Ok} /></div>}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>4) Что делает команда git revert?</h4>
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

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>5) Какая команда показывает журнал перемещений HEAD и ссылок (для восстановления коммитов)?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>
        <input value={q5} onChange={(e) => setQ5(e.target.value)} placeholder="например: git" style={inputStyle} />
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q5Ok} /></div>}
      </div>

      {/* Q6 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>6) Какую строку добавить в .gitignore, чтобы игнорировать все файлы с расширением .log?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите строку</div>
        <input value={q6} onChange={(e) => setQ6(e.target.value)} placeholder="например: *" style={inputStyle} />
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q6Ok} /></div>}
      </div>

      {/* Q7 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>7) Какая Linux-команда показывает путь к текущей директории?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>
        <div style={{ display: "grid", gap: 8 }}>
          {q7Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q7" checked={q7 === idx} onChange={() => setQ7(idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q7Ok} /></div>}
      </div>

      {/* Q8 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>8) Как вывести список файлов “подробно” и включая скрытые?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>
        <input value={q8} onChange={(e) => setQ8(e.target.value)} placeholder="например: cd" style={inputStyle} />
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q8Ok} /></div>}
      </div>

      {/* Q9 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          9) Какие из команд ниже относятся к Linux/терминалу (а не к Git) и часто используются при разработке?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите все подходящие ответы</div>
        <div style={{ display: "grid", gap: 8 }}>
          {q9Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="checkbox" checked={q9.has(idx)} onChange={() => toggleSet(setQ9, q9, idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q9Ok} /></div>}
      </div>

      {/* Q10 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>10) Как вывести историю коммитов в кратком виде (одна строка на коммит)?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Напишите команду</div>
        <input value={q10} onChange={(e) => setQ10(e.target.value)} placeholder="например: git" style={inputStyle} />
        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q10Ok} /></div>}
      </div>
    </div>
  );
}
