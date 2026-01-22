import React from "react";
import QuizBlock12 from "../components/QuizBlock12";

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

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 10,
  overflow: "hidden",
  borderRadius: 12,
};

const thtd = {
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "8px 10px",
  verticalAlign: "top",
};

export default function Lesson12() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 12. git reflog и git gc</h2>

        <h3>Конспект урока</h3>
        <p>
          Команда <b>git reflog</b> показывает журнал всех перемещений указателя <b>HEAD</b> и ссылок в репозитории,
          позволяя восстановить потерянные коммиты.
        </p>
        <p>
          Команда <b>git gc</b> выполняет сборку мусора в репозитории: удаляет неиспользуемые объекты и оптимизирует хранилище.
        </p>

        <h4>Новые команды</h4>
        <pre style={preStyle}>
{`# вывод reference log (только локальная история)
git reflog

# перемещение в другой репозиторий и вывод reflog
cd ../hellogitworld
pwd
git reflog

# сценарий: восстановление удаленного коммита
git reflog
git log --oneline
git reset --hard HEAD~1
git log --oneline
git reflog
git reset --hard 10f7044
git log --oneline

# сценарий: удаление старых записей
git reflog
git reflog expire --expire=7.days --all --verbose
git reflog

git reflog expire --expire=1.minutes --all --verbose
git reflog

# запуск сборщика мусора Git
git gc`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Сравнительная таблица</h4>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thtd, textAlign: "left" }}>Характеристика</th>
                <th style={{ ...thtd, textAlign: "left" }}>git log</th>
                <th style={{ ...thtd, textAlign: "left" }}>git reflog</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={thtd}>Что показывает</td>
                <td style={thtd}>Коммиты</td>
                <td style={thtd}>Перемещения HEAD</td>
              </tr>
              <tr>
                <td style={thtd}>Объем данных</td>
                <td style={thtd}>Только достижимые коммиты</td>
                <td style={thtd}>Все операции</td>
              </tr>
              <tr>
                <td style={thtd}>Время хранения</td>
                <td style={thtd}>Бессрочно</td>
                <td style={thtd}>90 дней (по умолчанию)</td>
              </tr>
              <tr>
                <td style={thtd}>Для чего использовать</td>
                <td style={thtd}>Анализ истории</td>
                <td style={thtd}>Восстановление данных</td>
              </tr>
              <tr>
                <td style={thtd}>Порядок вывода</td>
                <td style={thtd}>От новых к старым</td>
                <td style={thtd}>От новых к старым</td>
              </tr>
              <tr>
                <td style={thtd}>Показывает мержи</td>
                <td style={thtd}>Да</td>
                <td style={thtd}>Да</td>
              </tr>
              <tr>
                <td style={thtd}>Показывает reset</td>
                <td style={thtd}>Нет</td>
                <td style={thtd}>Да</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Документация git reflog:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-reflog" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-reflog
            </a>
          </li>
          <li>
            Документация git gc:{" "}
            <a style={aStyle} href="https://git-scm.com/docs/git-gc" target="_blank" rel="noreferrer">
              https://git-scm.com/docs/git-gc
            </a>
          </li>
        </ul>
      </div>

      {/* ТЕСТ */}
      <QuizBlock12 />
    </div>
  );
}
