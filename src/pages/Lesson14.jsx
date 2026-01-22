import React from "react";
import QuizBlock14 from "../components/QuizBlock14";

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

export default function Lesson14() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Урок 14. Linux команды для разработки + финальный квиз</h2>

        <h3>Теория: базовые Linux-команды, которые часто используют разработчики</h3>
        <p style={{ opacity: 0.9 }}>
          Во многих уроках Git встречаются команды терминала (особенно в Git Bash / Linux / WSL).
          Ниже — базовый набор, который пригодится почти в любом проекте.
        </p>

        <h4>Навигация и просмотр</h4>
        <pre style={preStyle}>
{`# где я?
pwd

# список файлов
ls

# список файлов + скрытые + подробно
ls -la

# перейти в папку
cd project/

# перейти на уровень выше
cd ..

# вернуться в предыдущую папку
cd -

# очистить экран (часто работает)
clear`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Создание / удаление / перемещение</h4>
        <pre style={preStyle}>
{`# создать папку
mkdir src
mkdir -p src/pages

# создать пустой файл
touch README.md

# копирование
cp file.txt copy.txt
cp -r folder folder_copy

# перемещение / переименование
mv old.txt new.txt
mv file.txt ./src/

# удаление файла
rm file.txt

# удаление папки рекурсивно (ОПАСНО!)
rm -r folder
rm -rf folder`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Просмотр и редактирование файлов</h4>
        <pre style={preStyle}>
{`# вывести файл в терминал
cat package.json

# постраничный просмотр (если доступно)
less package.json

# найти строку в файлах (поиск)
grep "react" package.json
grep -R "TODO" src

# редактор в терминале (что установленно)
nano .gitignore
# или vim (если умеешь)
vim README.md`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Права, процессы, сеть (очень часто в DevOps)</h4>
        <pre style={preStyle}>
{`# права доступа (посмотреть)
ls -la

# выдать право на запуск
chmod +x script.sh

# кто занимает порт / процессы (зависит от системы)
ps aux
# или:
top

# проверить доступность хоста (если разрешено)
ping -c 4 example.com`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Связка с Git (вспоминаем)</h4>
        <pre style={preStyle}>
{`# проверить статус репозитория
git status

# посмотреть историю
git log --oneline

# сравнить изменения
git diff
git diff --staged

# очистка неотслеживаемых файлов (ОСТОРОЖНО)
git clean -f
git clean -d -f`}
        </pre>

        <h4 style={{ marginTop: 16 }}>Полезные ссылки</h4>
        <ul>
          <li>
            Шпаргалка по Linux-командам (погуглить):{" "}
            <a style={aStyle} href="https://explainshell.com/" target="_blank" rel="noreferrer">
              explainshell.com
            </a>
          </li>
          <li>
            Документация Git:{" "}
            <a style={aStyle} href="https://git-scm.com/doc" target="_blank" rel="noreferrer">
              https://git-scm.com/doc
            </a>
          </li>
        </ul>
      </div>

      {/* ФИНАЛЬНЫЙ ТЕСТ */}
      <QuizBlock14 />
    </div>
  );
}
