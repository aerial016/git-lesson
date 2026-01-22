import React from "react";
import QuizBlock2 from "../components/QuizBlock2";

const card = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: 16,
};

const aStyle = { color: "#9bd1ff" };

export default function Lesson2() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 2. Установка Git и настройки git config</h2>

        <h3>Конспект урока</h3>

        <h4>Команды (проверка установки и справка)</h4>
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
{`# вызов краткой справки / проверка установки Git
git
git -h
git --help`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Страница загрузки Git для Windows:{" "}
            <a style={aStyle} href="https://git-scm.com/downloads/win" target="_blank" rel="noreferrer">
              https://git-scm.com/downloads/win
            </a>
          </li>
          <li>
            Инструкции по установке Git для MacOS:{" "}
            <a style={aStyle} href="https://git-scm.com/downloads/mac" target="_blank" rel="noreferrer">
              https://git-scm.com/downloads/mac
            </a>
          </li>
          <li>
            Инструкции по установке Git для Unix/Linux:{" "}
            <a style={aStyle} href="https://git-scm.com/downloads/linux" target="_blank" rel="noreferrer">
              https://git-scm.com/downloads/linux
            </a>
          </li>
        </ul>

        <hr style={{ borderColor: "rgba(255,255,255,0.12)", margin: "18px 0" }} />

        <h3>git config</h3>
        <p>
          Команда <b>git config</b> управляет настройками Git на уровне системы, пользователя или текущего
          репозитория.
        </p>

        <h4>Команды</h4>
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
{`# установка глобального пользователя Git (для всех проектов)
git config --global user.name "Pragmatic Programmer"

# установка глобального email пользователя Git (для всех проектов)
git config --global user.email "prag_prog@gmail.com"

# включение цветного вывода информации (в ряде случаев включено по умолчанию)
git config --global color.ui true

# вывод списка настроек
git config --list

# вывод имени пользователя/email из настроек
git config user.name
git config user.email

# вывод истории команд
history

# установка локальной настройки Git (для конкретного репозитория)
git config user.name "Pragmatic Programmer"
git config user.email "prag_prog@gmail.com"`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Расположение конфиг-файла (Windows)</h4>
        <ol>
          <li>
            <b>Системные настройки Git</b> (для всех пользователей):<br />
            <code>C:\Program Files\Git\etc\gitconfig</code>
          </li>
          <li style={{ marginTop: 8 }}>
            <b>Глобальные настройки</b> (для текущего пользователя):<br />
            <code>%USERPROFILE%\.gitconfig</code>
          </li>
          <li style={{ marginTop: 8 }}>
            <b>Локальные настройки</b> (для конкретного репозитория):<br />
            <code>{"<Путь_к_репозиторию>\\.git\\config"}</code>
          </li>
        </ol>

        <h4 style={{ marginTop: 16 }}>Полезная ссылка</h4>
        <ul>
          <li>
            Настройка Git:{" "}
            <a
              style={aStyle}
              href="https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-Git"
              target="_blank"
              rel="noreferrer"
            >
              git-scm.com/book/ru/v2/Введение-Первоначальная-настройка-Git
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock2 />
    </div>
  );
}
