import React from "react";
import QuizBlock3 from "../components/QuizBlock3";

const card = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: 16,
};

const aStyle = { color: "#9bd1ff" };

export default function Lesson3() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 3. git init и структура .git</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git init</b> создаёт новый локальный репозиторий Git в текущей директории,
          инициализируя скрытую папку <code>.git</code> для хранения всей служебной информации.
        </p>

        <h4>Команды</h4>
        <div style={{ opacity: 0.85, marginBottom: 10 }}>
          Внимание: команды для работы с файлами/папками лучше выполнять в <b>Git Bash</b>.
        </div>

        <pre
          style={{
            margin: 0,
            padding: 12,
            borderRadius: 12,
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.12)",
            overflowX: "auto",
          }}
        >
{`# создать каталог для проекта с именем 'first_project'
mkdir first_project

# вывести содержимое текущего каталога
ls

# перейти в созданный каталог
cd first_project/

# вывести путь к текущей локации
pwd

# вывести содержимое каталога в подробном (табличном виде), включая скрытые файлы и папки
ls -la

# (основная команда урока!) создать Git-репозиторий в текущей папке
git init

# перейти в папку '.git'
cd .git/

# вывести содержимое файла config
cat config

# задать локально (для текущего репозитория) имя пользователя Git
git config user.name "user22"

# вывести глобальное значение имени пользователя Git
git config --global user.name

# вывести локальное значение имени пользователя Git
git config user.name

# вывести список всех настроек Git
git config --list

# вывести список глобальных настроек Git
git config list --global

# вывести список локальных настроек Git
git config list --local

# переместиться в предыдущую локацию
cd -

# переместиться в домашний каталог пользователя
cd c:/Users/Pragmatic_Programmer

# вывести содержимое файла '.gitconfig'
cat .gitconfig`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Бесплатный курс по основам командной строки:{" "}
            <a style={aStyle} href="https://stepik.org/course/185439/" target="_blank" rel="noreferrer">
              https://stepik.org/course/185439/
            </a>
          </li>
          <li>
            Документация git init:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-init" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-init
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock3 />
    </div>
  );
}
