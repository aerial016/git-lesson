import React from "react";
import QuizBlock5 from "../components/QuizBlock5";

const card = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: 16,
};

const aStyle = { color: "#9bd1ff" };

const preStyle = {
  margin: 0,
  padding: 12,
  borderRadius: 12,
  background: "rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,255,255,0.12)",
  overflowX: "auto",
};

export default function Lesson5() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 5. Индекс (staging area) и состояния файлов</h2>

        <h3>Конспект урока</h3>
        <p>
          <b>Git индекс</b> (или <b>staging area</b>) — это промежуточная область, где формируется содержимое
          следующего коммита, позволяя выбрать конкретные изменения для фиксации.
        </p>

        <h4>Компоненты Git</h4>
        <pre style={preStyle}>
{`рабочая директория (git add ->) Индекс stage (git commit ->) репозиторий`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Состояния файлов в Git</h4>
        <pre style={preStyle}>
{`Untracked (git add ->) Staged (git commit ->) Unmodified ([edit] ->) Modified (git add -> Staged) Unmodified ([remove] -> Untracked)`}
        </pre>

        <ul>
          <li><b>Untracked</b> — файл не отслеживается Git.</li>
          <li><b>Staged</b> — файл добавлен в индекс и готов к коммиту.</li>
          <li><b>Modified</b> — файл изменён, но изменения не добавлены в индекс.</li>
          <li><b>Unmodified</b> — файл не изменён с момента последнего коммита.</li>
        </ul>

        <h4>Новая команда</h4>
        <pre style={preStyle}>
{`# отменить все изменения после последнего коммита
# (подробнее будет рассмотрена далее в курсе)
git reset --hard`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Статья "Внутреннее устройство Git":{" "}
            <a style={aStyle} href="https://smartiqa.ru/courses/git/lesson-2" target="_blank" rel="noreferrer">
              https://smartiqa.ru/courses/git/lesson-2
            </a>
          </li>
          <li>
            Статья "Индекс в Git":{" "}
            <a style={aStyle} href="https://ru.hexlet.io/courses/intro_to_git/lessons/index/theory_unit" target="_blank" rel="noreferrer">
              https://ru.hexlet.io/courses/intro_to_git/lessons/index/theory_unit
            </a>
          </li>
          <li>
            Состояния файлов в Git:{" "}
            <a style={aStyle} href="https://www.geeksforgeeks.org/states-of-a-file-in-git-working-directory/" target="_blank" rel="noreferrer">
              https://www.geeksforgeeks.org/states-of-a-file-in-git-working-directory/
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock5 />
    </div>
  );
}
