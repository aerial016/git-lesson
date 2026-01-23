import React from "react";
import QuizBlock8 from "../components/QuizBlock8";

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

export default function Lesson8() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 8. git rm и git clean</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git rm</b> удаляет файлы из рабочего каталога и одновременно из индекса Git,
          подготавливая это изменение для следующего коммита.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# вызов справки
git rm --help

# удаление файла из каталога (команда терминала)
rm page2.html

# удаление файла из Git-репозитория
git rm page2.html

# форсированное удаление файла (если есть изменения в индексе)
git rm page2.html -f
git rm page2.html --force

# удаление каталога
git rm my_folder -r
git rm my_folder --recursive`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git rm:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-rm" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-rm
            </a>
          </li>
          <li>
            Статья:{" "}
            <a style={aStyle} href="https://smartiqa.ru/courses/git/lesson-4" target="_blank" rel="noreferrer">
              https://smartiqa.ru/courses/git/lesson-4
            </a>
          </li>
        </ul>

        <hr style={{ borderColor: "rgba(255,255,255,0.12)", margin: "18px 0" }} />

        <p>
          Команда <b>git clean</b> удаляет неотслеживаемые файлы из рабочего каталога.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# вызов справки
git clean --help

# сценарий 1
touch some_binary_file{1..9}.bin
ls
git status
git clean -f
ls
git status

# сценарий 2
mkdir bin
mkdir tmp
ls
git status
git clean -d -f
ls
git status

# ключ -n — "холостой прогон" (покажет, что будет происходить)
git clean -f -n
git clean -f -d -n

# ключ -q — тихое выполнение
git clean -f -d -q`}
        </pre>

        <p style={{ opacity: 0.9 }}>
          Флаг <b>-f</b> (force) обязателен для подтверждения действия <code>git clean</code> — это механизм
          безопасности от случайного удаления файлов.
        </p>
        <p style={{ opacity: 0.9 }}>
          Флаг <b>-d</b> Позволяет подтвердить удаление большого количества файлов которые отслеживаются,
          если не отслеживаются тег не обязателен.
        </p>
        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git clean:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-clean" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-clean
            </a>
          </li>
          <li>
            Статья (git book):{" "}
            <a
              style={aStyle}
              href="https://git-scm.com/book/ru/v2/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-Git-%D0%9F%D1%80%D0%B8%D0%BF%D1%80%D1%8F%D1%82%D1%8B%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%BA%D0%B0"
              target="_blank"
              rel="noreferrer"
            >
              git-scm.com/book/.../Припрятывание-и-очистка
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock8 />
    </div>
  );
}
