import React from "react";
import QuizBlock7 from "../components/QuizBlock7";

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

export default function Lesson7() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 7. git reset и git revert</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git reset</b> перемещает указатель текущей ветки (HEAD) на указанный коммит,
          позволяя отменить изменения или изменить историю.
        </p>

        <h4>Команды</h4>
        <pre style={preStyle}>
{`# сбросить весь индекс/stage (сохраняя изменения в папке)
git reset

# убрать файл из индекса
git reset <file_name>

# вернуть к состоянию последнего коммита (если поломали код, например)
git reset --hard

# отменить последний коммит (сохраняя сами изменения)
git reset HEAD~1
git reset HEAD^

# отменить последние 2 коммита
git reset HEAD~2
git reset HEAD^^

# отменить последние 3 коммита
git reset HEAD~3
git reset HEAD^^^

# отменить последние 2 коммита (удаляя изменения)
git reset HEAD~2 --hard

# вывести предыдущее значение HEAD
cat .git/ORIG_HEAD

# вернуться к коммиту, на который указывает ORIG_HEAD
git reset ORIG_HEAD --hard

# вернуться к состоянию после указанного коммита
git reset --hard <commit_id>`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Флаги reset</h4>
        <pre style={preStyle}>{`рабочая директория  индекс(stage)  репозиторий`}</pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git reset:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-reset" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-reset
            </a>
          </li>
          <li>
            Статья (git book):{" "}
            <a
              style={aStyle}
              href="https://git-scm.com/book/ru/v2/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-Git-%D0%A0%D0%B0%D1%81%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5-%D1%82%D0%B0%D0%B9%D0%BD-reset"
              target="_blank"
              rel="noreferrer"
            >
              git-scm.com/book/.../Раскрытие-тайн-reset
            </a>
          </li>
        </ul>

        <hr style={{ borderColor: "rgba(255,255,255,0.12)", margin: "18px 0" }} />

        <p>
          Команда <b>git revert</b> создаёт новый коммит, который отменяет изменения, внесённые указанным коммитом,
          не удаляя его из истории.
        </p>

        <h4>Команды</h4>
        <pre style={preStyle}>
{`# история коммитов в кратком виде
git log --oneline

# краткая справка по команде revert
git revert

# подробная справка по команде revert
git revert --help

# детали последнего коммита
git show

# откатить последний коммит (создавая новый "обратный коммит")
git revert HEAD

# вывод содержимого файла styles.css на экран
cat styles.css

# откатить последний коммит без ввода сообщения для коммита
git revert HEAD --no-edit

# откатить коммит по его идентификатору (хэш-коду)
git revert 8ab14c

# откатить третий коммит с конца
git revert HEAD~3

# отменить незавершенный откат коммита
git revert --abort

# откатить серию коммитов
git revert 9e59768..4b2413e

# откатить коммит без создания нового коммита (изменения попадают в индекс)
git revert 9e59768 --no-commit`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git revert:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-revert" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-revert
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock7 />
    </div>
  );
}
