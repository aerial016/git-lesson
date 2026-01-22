import React from "react";
import QuizBlock6 from "../components/QuizBlock6";

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

export default function Lesson6() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 6. Расширенные варианты commit и просмотр коммитов</h2>

        <h3>Конспект урока</h3>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# "ленивый коммит" (без команды 'git add')
git commit -a

# добавить изменения в индексе в предыдущий коммит
git commit --amend

# показать детальную информацию о последнем коммите
git show

# показать детальную информацию об указанном коммите
git show <commit_id>

# вывести только имена файлов, участвовавших в коммите
git show --name-only <commit_id>`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Ещё команды</h4>
        <pre style={preStyle}>
{`# переместить "голову" репозитория на 1 коммит назад
# (команда будет подробно рассмотрена в следующих уроках)
git reset HEAD~1

# выполнить коммит с указанным сообщением (после ключа -m)
git commit -m "add some new features"

# совместить ключи -a -m в коммите
git commit -am "add some new features"`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Рекомендации по сообщениям коммита</h4>
        <ul>
          <li>Пустая строка между темой сообщения и его телом</li>
          <li>Тема короче 50 символов</li>
          <li>Тема в верхнем регистре — опционально</li>
          <li>Точка в конце темы не ставится</li>
          <li>Тело короче 80 символов</li>
          <li>Тело объясняет: что изменено, а не почему</li>
          <li>Тема отвечает на вопрос: “Что делает коммит?”</li>
        </ul>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Статья:{" "}
            <a style={aStyle} href="https://uleming.github.io/gitbook/3_%D0%9E%D0%B1%D1%8B%D1%87%D0%BD%D1%8B%D0%B9_%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9_%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81.html" target="_blank" rel="noreferrer">
              uleming.github.io/gitbook/...
            </a>
          </li>
          <li>
            Статья 2:{" "}
            <a style={aStyle} href="https://struchkov.dev/blog/ru/git-how-to-commit/" target="_blank" rel="noreferrer">
              https://struchkov.dev/blog/ru/git-how-to-commit/
            </a>
          </li>
          <li>
            Документация git show:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-show" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-show
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock6 />
    </div>
  );
}
