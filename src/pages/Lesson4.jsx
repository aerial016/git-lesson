import React from "react";
import QuizBlock4 from "../components/QuizBlock4";

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

export default function Lesson4() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 4. git add и git commit</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git commit</b> фиксирует текущие изменения, добавленные в индекс, и сохраняет их в истории
          репозитория в виде нового коммита.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# посмотреть состояние файлов в индексе
git status

# посмотреть историю коммитов
git log

# вывести на экран содержимое указанного файла
cat page1.html

# добавить в индекс указанный файл
git add page1.html

# сделать коммит (требует ввода текстового сообщения)
git commit`}
        </pre>

        <hr style={{ borderColor: "rgba(255,255,255,0.12)", margin: "18px 0" }} />

        <p>
          Команда <b>git add</b> добавляет изменения из рабочего каталога в индекс (staging area) для подготовки
          их к последующему коммиту.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# вывод списка настроек
git config --list

# установить редактор по умолчанию для Git
git config core.editor "nano"

# добавить в индекс все файлы в текущей папке
git add .

# добавить в индекс указанный файл
git add page1.html

# посмотреть историю коммитов в компактном виде
git log --oneline`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Статья:{" "}
            <a
              style={aStyle}
              href="https://git-scm.com/book/ru/v2/%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D1%8B-Git-%D0%97%D0%B0%D0%BF%D0%B8%D1%81%D1%8C-%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9-%D0%B2-%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B9"
              target="_blank"
              rel="noreferrer"
            >
              git-scm.com/book/ru/v2/Основы-Git-Запись-изменений-в-репозиторий
            </a>
          </li>
          <li>
            Документация git commit:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-commit" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-commit
            </a>
          </li>
          <li>
            Документация git status:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-status" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-status
            </a>
          </li>
          <li>
            Документация git log:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-log" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-log
            </a>
          </li>
          <li>
            Документация git add:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-add" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-add
            </a>
          </li>
          <li>
            Обсуждение (разница add/add -A/add -u):{" "}
            <a
              style={aStyle}
              href="https://ru.stackoverflow.com/questions/431839/%D0%92-%D1%87%D0%B5%D0%BC-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-git-add-add-a-add-u-%D0%B8-add"
              target="_blank"
              rel="noreferrer"
            >
              ru.stackoverflow.com/questions/431839/...
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock4 />
    </div>
  );
}
