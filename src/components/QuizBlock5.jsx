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

export default function QuizBlock5() {
  const [checked, setChecked] = useState(false);

  // ===== Q1 (matching): commands -> actions =====
  const q1RightItems = useMemo(
    () => ["Создает файл в рабочей директории", "Добавляет файл в индекс Git", "Коммитит файл в Git репозитории"],
    []
  );

  const [q1, setQ1] = useState({
    touch: "",
    add: "",
    commit: "",
  });

  const q1Correct = useMemo(
    () => ({
      touch: "Создает файл в рабочей директории",
      add: "Добавляет файл в индекс Git",
      commit: "Коммитит файл в Git репозитории",
    }),
    []
  );

  const q1Ok =
    q1.touch === q1Correct.touch &&
    q1.add === q1Correct.add &&
    q1.commit === q1Correct.commit;

  // ===== Q2 (radio): what is staging area =====
  const q2Options = useMemo(
    () => [
      "Промежуточная область, где собираются изменения, которые будут включены в следующий коммит.",
      "Графическое представление ветвления и слияния в репозитории.",
      "Каталог со всеми служебными файлами Git в папке .git.",
      "Полная история всех коммитов в хронологическом порядке.",
      "Панель статистики по активности разработчиков в проекте.",
    ],
    []
  );
  const [q2, setQ2] = useState(null);
  const q2Ok = q2 === 0;

  // ===== Q3 (checkboxes): git components =====
  const q3Options = useMemo(
    () => ["Кэш-зона", "Индекс (Stage)", "Локальный репозиторий", "Рабочая директория", "Зеркало репозитория"],
    []
  );
  // правильные: Индекс, Локальный репозиторий, Рабочая директория
  const q3Correct = useMemo(() => new Set([1, 2, 3]), []);
  const [q3, setQ3] = useState(new Set());
  const q3Ok = isSetEqual(q3, q3Correct);

  // ===== Q4 (checkboxes): file states =====
  const q4Options = useMemo(
    () => [
      "Unmodified — файл не менялся с момента последнего коммита. Текущее состояние совпадает с последней зафиксированной версией.",
      "Locked — файл заблокирован для редактирования, чтобы избежать конфликтов.",
      "Committed — изменения файла уже сохранены в истории локального репозитория.",
      "Modified — файл, уже отслеживаемый Git, был изменён, но изменения ещё не добавлены в индекс.",
      "Pending — изменения файла ожидают проверки или внешнего одобрения перед коммитом.",
      "Staged — файл добавлен в индекс (staging area) и будет включён в следующий коммит.",
      "Cached — файл временно хранится в памяти Git для ускорения операций.",
      "Approved — изменения файла были проверены и одобрены для коммита.",
      "Untracked — файл существует в рабочей директории, но Git ещё не начал отслеживать его изменения.",
    ],
    []
  );
  // правильные: Unmodified, Modified, Staged, Untracked
  const q4Correct = useMemo(() => new Set([0, 3, 5, 8]), []);
  const [q4, setQ4] = useState(new Set());
  const q4Ok = isSetEqual(q4, q4Correct);

  // ===== Q5 (matching): actions -> state transitions =====
  const q5RightItems = useMemo(
    () => ["Unmodified → Modified", "Staged → Unmodified", "Untracked → Staged (если файл новый)"],
    []
  );

  const [q5, setQ5] = useState({
    edit: "",
    commit: "",
    add: "",
  });

  const q5Correct = useMemo(
    () => ({
      edit: "Unmodified → Modified",
      commit: "Staged → Unmodified",
      add: "Untracked → Staged (если файл новый)",
    }),
    []
  );

  const q5Ok = q5.edit === q5Correct.edit && q5.commit === q5Correct.commit && q5.add === q5Correct.add;

  // ===== Общий результат =====
  const total = 5;
  const score = [q1Ok, q2Ok, q3Ok, q4Ok, q5Ok].filter(Boolean).length;

  // ✅ Сохраняем прогресс урока 5
  useEffect(() => {
    if (!checked) return;
    const passed = score === total;
    if (passed) {
      localStorage.setItem("lesson5_passed", "1");
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
    setQ1({ touch: "", add: "", commit: "" });
    setQ2(null);
    setQ3(new Set());
    setQ4(new Set());
    setQ5({ edit: "", commit: "", add: "" });
    setChecked(false);
  }

  const selectStyle = {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255, 255, 255, 0.66)",
    color: "#000000ff",
    outline: "none",
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0 }}>Тест по уроку 5</h3>
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
        <h4 style={{ marginTop: 0 }}>1) Сопоставьте команды с действием, которое они выполняют.</h4>

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>touch style.css</code></div>
            <select
              value={q1.touch}
              onChange={(e) => setQ1((p) => ({ ...p, touch: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {q1RightItems.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>git add style.css</code></div>
            <select
              value={q1.add}
              onChange={(e) => setQ1((p) => ({ ...p, add: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {q1RightItems.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>git commit</code></div>
            <select
              value={q1.commit}
              onChange={(e) => setQ1((p) => ({ ...p, commit: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {q1RightItems.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q1Ok} /></div>}
      </div>

      {/* Q2 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>2) Что такое «индекс» (staging area) в Git?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите один вариант</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q2Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="radio" name="q2" checked={q2 === idx} onChange={() => setQ2(idx)} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q2Ok} /></div>}
      </div>

      {/* Q3 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>3) Какие элементы являются компонентами Git?</h4>
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

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q3Ok} /></div>}
      </div>

      {/* Q4 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>4) Какие состояния файла существуют в Git?</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>Выберите все подходящие ответы</div>

        <div style={{ display: "grid", gap: 8 }}>
          {q4Options.map((t, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <input
                type="checkbox"
                checked={q4.has(idx)}
                onChange={() => toggleSet(setQ4, q4, idx)}
                style={{ marginTop: 4 }}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q4Ok} /></div>}
      </div>

      {/* Q5 */}
      <div style={card}>
        <h4 style={{ marginTop: 0 }}>5) Сопоставьте команды Git и состояние файла, в которое они переводят его.</h4>

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>nano file.txt</code> (редактирование)</div>
            <select
              value={q5.edit}
              onChange={(e) => setQ5((p) => ({ ...p, edit: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {q5RightItems.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>git commit</code></div>
            <select
              value={q5.commit}
              onChange={(e) => setQ5((p) => ({ ...p, commit: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {q5RightItems.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 10, alignItems: "center" }}>
            <div><code style={{ color: "#fff" }}>git add file.txt</code></div>
            <select
              value={q5.add}
              onChange={(e) => setQ5((p) => ({ ...p, add: e.target.value }))}
              style={selectStyle}
            >
              <option value="">— выберите —</option>
              {q5RightItems.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>

        {checked && <div style={{ marginTop: 12 }}><ResultBadge ok={q5Ok} /></div>}
      </div>
    </div>
  );
}
