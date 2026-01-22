import React from "react";
import QuizBlock9 from "../components/QuizBlock9";

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

export default function Lesson9() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 9. git mv — переименование и перемещение файлов</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git mv</b> перемещает или переименовывает файлы в рабочем каталоге и одновременно обновляет индекс Git,
          подготавливая это изменение для следующего коммита.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# переименование файла в терминале
mv page1.html index.html

# набор команд для корректного переименования в Git
mv page1.html index.html
git add index.html
git rm page1.html

# переименование/перемещение файла в Git одной командой
git mv page1.html index.html

# вызов справки
git mv --help

# создаем папку styles
mkdir styles

# перемещаем файл с CSS-стилями в новую папку
git mv styles.css styles

# делаем коммит
git commit -m "create folder for css styles"

# переименование папки в Git
git mv styles css

# создаем папку web_pages
mkdir web_pages

# перемещение набора файлов
git mv *.html web_pages`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git mv:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-mv" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-mv
            </a>
          </li>
          <li>
            Статья:{" "}
            <a style={aStyle} href="https://githowto.com/ru/moving_files" target="_blank" rel="noreferrer">
              https://githowto.com/ru/moving_files
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock9 />
    </div>
  );
}
