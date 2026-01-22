import React from "react";
import QuizBlock11 from "../components/QuizBlock11";

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

export default function Lesson11() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 11. git log и git shortlog</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git log</b> показывает историю коммитов в текущей ветке.
        </p>
        <p>
          Команда <b>git shortlog</b> группирует коммиты по авторам и показывает сокращенную историю изменений.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# базовое использование команды просмотра логов
git log

# просмотр логов в кратком формате
git log --oneline

# вызов справки
git log --help

# вывод статистики по коммитам
git log --stat

# просмотр патчей по коммитам
git log -p

# ограничение количества комитов
git log -4

# сочетание опций
git log --stat -p
git log -4 --stat -p

# отображение веток
git log --graph

# клонирование репозитория
cd ..
git clone https://github.com/githubtraining/hellogitworld
cd helloworld
ls -a

# использование команд в новом репозитории
git status
git log
git log --oneline
git log --oneline README.txt
git log --stat
git log --graph

# фильтр по автору
git log --author="Jordan McCullough" --oneline

# форматирование
git log -5 --pretty=format:"%h - %an - %as - %s"
git log -5 --pretty=format:"%h - %an - %as %n >> %s"

# читабельное предложение
git log --pretty=format:"This guy:%cn committed with hash '%h' on %cd"

# shortlog — группировка по авторам
git shortlog

# email рядом с именем автора
git shortlog -e

# сортировка по количеству коммитов (по убыванию)
git shortlog -n

# только статистика (без сообщений)
git shortlog -s

# фильтрация по датам
git shortlog --since="2012-01-01" --until="2012-12-31"`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные опции для git log --pretty=format</h4>
        <pre style={preStyle}>
{`%H  — хеш коммита
%h  — сокращённый хеш коммита
%T  — хеш дерева
%t  — сокращённый хеш дерева
%P  — хеш родителей
%p  — сокращённый хеш родителей
%an — имя автора
%ae — email автора
%ad — дата автора
%ar — относительная дата автора
%cn — имя коммитера
%ce — email коммитера
%cd — дата коммитера
%cr — относительная дата коммитера
%s  — содержание (тема)`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Статья:{" "}
            <a style={aStyle} href="https://uleming.github.io/gitbook/3_%D0%9F%D1%80%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80_%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8_-_git_log.html" target="_blank" rel="noreferrer">
              Просмотр истории
            </a>
          </li>
          <li>
            Git Book:{" "}
            <a style={aStyle} href="https://git-scm.com/book/ru/v2/%D0%9F%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-C:-%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B-Git-%D0%9E%D1%81%D0%BC%D0%BE%D1%82%D1%80-%D0%B8-%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5" target="_blank" rel="noreferrer">
              Осмотр и сравнение
            </a>
          </li>
          <li>
            Документация git log:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-log" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-log
            </a>
          </li>
          <li>
            Документация git shortlog:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-shortlog" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-shortlog
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock11 />
    </div>
  );
}
