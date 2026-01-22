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

export default function QuizBlock10() {
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

  // Q1 (radio): what is git diff
  const q1Options = useMemo(
    () => [
      "Ищет различия в настроении разработчиков, работавших над кодом.",
      "Показывает разницу между изменениями: между рабочим каталогом и индексом, между индексом и последним коммитом, или между любыми коммитами.",
      "Создает сводный отчет о всех файлах в репозитории, включая размер и дату изменения.",
      "Раскрашивает все файлы в репозитории в разные цвета для удобства чтения.",
    ],
    []
  );
  const [q1, setQ1] = useState(null);
  const q1Ok = q1 === 1;

  // Q2 (checkboxes): staged/cached
  const q2Options = useMemo(() => ["--stat", "--stage", "--stable", "--cached", "--staged", "--stash"], []);
  const [q2, setQ2] = useState(new Set());
  const q2Correct = useMemo(() => new Set([3, 4]), []); // --cached, --staged
  const q2Ok = isSetEqual(q2, q2Correct);

  // Q3 (text): diff between commits (fixed answer required)
  const [q3, setQ3] = useState("");
  const q3Ok = normalizeCmd(q3) === "git diff c1b2a3 f6e5d4";

  // Q4 (text): diff between files
  const [q4, setQ4] = useState("");
  const q4Ok = normalizeCmd(q4) === "git diff about.html about-us.html";

  // Q5 (radio): diff vs difftool
  const q5Options = useMemo(
    () => [
      "git diff и git difftool — это одно и то же, просто разные алиасы.",
      "git difftool всегда коммитит изменения после сравнения, а git diff — нет.",
      "git diff показывает различия в текстовом виде прямо в терминале, а git difftool использует сторонние графические приложения для наглядного сравнения изменений.",
      "git diff работает только с файлами вне репозитория, а git difftool — только внутри репозитория.",
      "git difftool показывает только список файлов без строковых изменений, а git diff — только изменения строк без списка файлов.",
    ],
    []
  );
  const [q5, setQ5] = useState(null);
  const q5Ok = q5 === 2;

  // Q6 (text): git show commit changes
  const [q6, setQ6] = useState("");
  const q6Ok = normalizeCmd(q6) === "git show c1b2a3";

  const total = 6;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok, q6Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 10
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson10_passed", "1");
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
    setQ2(new Set());
    setQ3("");
    setQ4("");
    setQ5(null);
    setQ6("");
    setChecked(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 10</h3>
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
        <h4 style={{ marginTop: 0 }}>1) Что делает команда git diff?</h4>
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
          2) Какие ключи заставляют git diff показывать разницу между индексом (staging) и последним коммитом (HEAD)?
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите все подходящие ответы</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q2Options.map((t, idx) => (
            <label key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="checkbox" checked={q2.has(idx)} onChange={() => toggleSet(setQ2, q2, idx)} />
              <code style={{ color: "#fff" }}>{t}</code>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q2Ok} /></div>}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          3) В репозитории есть 2 коммита с идентификаторами <code style={{ color: "#fff" }}>c1b2a3</code> и{" "}
          <code style={{ color: "#fff" }}>f6e5d4</code>. Напишите команду, которая выведет разницу между ними.
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>
          Пример: <code style={{ color: "#fff" }}>git diff 111aaa 222bbb</code>
        </div>

        <input
          value={q3}
          onChange={(e) => setQ3(e.target.value)}
          placeholder="введите команду…"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q3Ok} /></div>}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          4) Есть файлы <code style={{ color: "#fff" }}>about.html</code> и <code style={{ color: "#fff" }}>about-us.html</code>.
          Напишите команду, которая выведет разницу между ними.
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>
          Пример: <code style={{ color: "#fff" }}>git diff a.txt b.txt</code>
        </div>

        <input
          value={q4}
          onChange={(e) => setQ4(e.target.value)}
          placeholder="введите команду…"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q4Ok} /></div>}
      </div>

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>5) В чем разница между git diff и git difftool?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q5Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q5" checked={q5 === idx} onChange={() => setQ5(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q5Ok} /></div>}
      </div>

      {/* Q6 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>
          6) Есть коммит с идентификатором <code style={{ color: "#fff" }}>c1b2a3</code>. Напишите команду, которая выведет
          только изменения, выполненные в этом коммите.
        </h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>
          Пример: <code style={{ color: "#fff" }}>git show 123abc</code>
        </div>

        <input
          value={q6}
          onChange={(e) => setQ6(e.target.value)}
          placeholder="введите команду…"
          style={inputStyle}
        />

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q6Ok} /></div>}
      </div>
    </div>
  );
}
