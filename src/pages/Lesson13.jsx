import React from "react";
import QuizBlock13 from "../components/QuizBlock13";

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

export default function Lesson13() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 13. .gitignore — игнорирование файлов</h2>

        <h3>Конспект урока</h3>
        <p>
          Файл <b>.gitignore</b> определяет шаблоны файлов и директорий, которые Git должен игнорировать и не отслеживать.
        </p>

        <h4>Список команд (примеры)</h4>
        <pre style={preStyle}>
{`## простой пример
cd ../first_project
touch events.log
git status
nano .gitignore
# добавить строку:
events.log

git status
git add .
git status
git commit -m "add .gitignore file"
git log --oneline

## шаблоны (*, ?)
touch events_123.log e_123123.log
git status
nano .gitignore
# добавить строку:
*.log

git status
git add .
git commit --amend --no-edit
git log --oneline

## игнор папки
mkdir logs
mv *.log logs
git status
nano .gitignore
# добавить строку:
logs/*

git status
git add .
git commit --amend --no-edit
git log --oneline

## отмена игнора (“!”)
touch rare_critical_errors.log
git status
nano .gitignore
# добавить строку:
!rare_critical_errors.log

git status
git add .
git commit --amend --no-edit
git log --oneline
git log --stat -1`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Форсированное добавление (редкий сценарий)</h4>
        <pre style={preStyle}>
{`touch debug.log
git status

# принудительно добавляем в индекс (даже если игнорируется)
git add -f debug.log
git status
git commit -m "force adding debug.log"
git log --oneline`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Глобальные настройки ignore</h4>
        <pre style={preStyle}>
{`# глобальная настройка пути к файлу исключений
git config --global core.excludesfile ~/.gitignore_global

# создаём файл и добавляем правила
touch ~/.gitignore_global
nano ~/.gitignore_global
# например:
*.tmp

# тестовый файл (должен игнорироваться)
touch tempfile.tmp
git status`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация .gitignore:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/gitignore" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/gitignore
            </a>
          </li>
          <li>
            Статья:{" "}
            <a style={aStyle} href="https://uleming.github.io/gitbook/4_%D0%98%D0%B3%D0%BD%D0%BE%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2.html" target="_blank" rel="noreferrer">
              Игнорирование файлов
            </a>
          </li>
          <li>
            StackOverflow:{" "}
            <a style={aStyle} href="https://ru.stackoverflow.com/questions/474556/%D0%A7%D1%82%D0%BE-%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D0%BE-%D0%B8-%D0%BD%D0%B5-%D0%B4%D0%BE%D0%BB%D0%B6%D00%BD%D0%BE-%D0%B1%D1%8B%D1%82%D1%8C-%D0%B2-gitignore-%D0%B4%D0%BB%D1%8F-%D0%BB%D1%8E%D0%B1%D0%BE%D0%B3%D0%BE-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B8-ide" target="_blank" rel="noreferrer">
              Что должно и не должно быть в gitignore
            </a>
          </li>
          <li>
            Типовые .gitignore:{" "}
            <a style={aStyle} href="https://www.toptal.com/developers/gitignore" target="_blank" rel="noreferrer">
              toptal.com/developers/gitignore
            </a>{" "}
            и{" "}
            <a style={aStyle} href="https://github.com/github/gitignore/" target="_blank" rel="noreferrer">
              github/gitignore
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock13 />
    </div>
  );
}
