import React from "react";
import QuizBlock10 from "../components/QuizBlock10";

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

export default function Lesson10() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 10. git diff, git difftool и git show</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git diff</b> показывает различия между коммитами, ветками, рабочим каталогом и индексом.
        </p>
        <p>
          Команда <b>git difftool</b> запускает внешнюю утилиту для визуального сравнения различий между коммитами, ветками или файлами.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# справка
git diff --help

# изменения после последнего коммита (не в индексе)
git diff

# изменения после последнего коммита (включая добавленные в индекс)
git diff HEAD

# изменения, добавленные в индекс
git diff --staged
git diff --cached

# форматирование по словам
git diff --word-diff

# исключение пустых строк
git diff -w

# изменения после HEAD~1 (и до HEAD)
git diff HEAD~1

# указание хэша коммита
git diff 8a8b14c

# разница между двумя коммитами
git diff 8a8b14c b0272be

# изменения в конкретном файле после указанного коммита
git diff HEAD~1 web_pages/index.html

# сравнение двух файлов (даже вне git-репозитория)
git diff index.html page2.html

# справка difftool
git difftool --help

# difftool для изменений после коммита
git difftool 8a8b14c`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git diff:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-diff" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-diff
            </a>
          </li>
          <li>
            Документация git difftool:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-difftool" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-difftool
            </a>
          </li>
          <li>
            Статья (Habr):{" "}
            <a style={aStyle} href="https://habr.com/ru/companies/skillfactory/articles/544864/" target="_blank" rel="noreferrer">
              https://habr.com/ru/companies/skillfactory/articles/544864/
            </a>
          </li>
          <li>
            Настройка difftool (EN):{" "}
            <a style={aStyle} href="https://graphite.dev/guides/git-difftool" target="_blank" rel="noreferrer">
              https://graphite.dev/guides/git-difftool
            </a>
          </li>
        </ul>

        <hr style={{ borderColor: "rgba(255,255,255,0.12)", margin: "18px 0" }} />

        <p>
          Команда <b>git show</b> отображает информацию о конкретном объекте Git: коммите, теге, дереве или файле.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# просмотр последнего коммита (часто похоже на diff HEAD~1)
git show
git diff HEAD~1

# вывести все накопленные изменения между текущим состоянием и состоянием на момент указанного коммита
git diff bea5ea0

# вывести только изменения, выполненные в указанном коммите
git show bea5ea0

# вывести все коммиты с изменениями между двумя коммитами
git show 0e47d61..ca3a6b1

# вывести все накопленные изменения в файлах между двумя коммитами
git diff 0e47d61..ca3a6b1
git diff 0e47d61 ca3a6b1

# просмотр изменений файла в определённом коммите
git show HEAD~1:styles/styles.css
git diff HEAD~1 css/styles.css

# вывести только список файлов, измененных в указанном коммите
git show 4b2413e --name-only
git show 55f77dc --name-only

# вывести только список файлов, измененных с указанного коммита и до текущего состояния
git diff 55f77dc --name-only`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git show:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-show" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-show
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock10 />
    </div>
  );
}
