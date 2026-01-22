import React from "react";
import QuizBlock from "../components/QuizBlock";

const card = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: 16,
};

const aStyle = { color: "#9bd1ff" };

export default function Lesson1() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 1. Введение в VCS</h2>

        <h3>Конспект урока</h3>
        <p>
          <b>VCS (Version Control System)</b> — системы контроля версий.
        </p>

        <h4>Решаемые задачи</h4>
        <ul>
          <li>Поддержка нескольких версий кода</li>
          <li>Возможность отката к прошлым версиям</li>
          <li>Возможность идентифицировать автора</li>
        </ul>

        <h4>Области применения VCS</h4>
        <ul>
          <li>Программный код</li>
          <li>Электронный документооборот</li>
          <li>Управление конфигурациями</li>
          <li>Версионирование статей</li>
        </ul>

        <h4>Типы VCS</h4>
        <ul>
          <li>Локальные: Revision Control System</li>
          <li>Централизованные: SVN, Subversion</li>
          <li>Распределенные: Git, Mercurial</li>
        </ul>

        <h4>Полезные ссылки</h4>
        <ul>
          <li>
            Официальный сайт Revision Control System:{" "}
            <a style={aStyle} href="https://www.gnu.org/software/rcs/rcs.html" target="_blank" rel="noreferrer">
              https://www.gnu.org/software/rcs/rcs.html
            </a>
          </li>
          <li>
            Официальный сайт Git:{" "}
            <a style={aStyle} href="https://git-scm.com/" target="_blank" rel="noreferrer">
              https://git-scm.com/
            </a>
          </li>
          <li>
            Официальный сайт Subversion:{" "}
            <a style={aStyle} href="https://subversion.apache.org/" target="_blank" rel="noreferrer">
              https://subversion.apache.org/
            </a>
          </li>
        </ul>
      </div>

      {/* Тесты */}
      <QuizBlock />
    </div>
  );
}
