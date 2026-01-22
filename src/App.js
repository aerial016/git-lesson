import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

import Home from "./Home.jsx";
import Lesson1 from "./pages/Lesson1";
import Lesson2 from "./pages/Lesson2";
import Lesson3 from "./pages/Lesson3";
import Lesson4 from "./pages/Lesson4";
import Lesson5 from "./pages/Lesson5";
import Lesson6 from "./pages/Lesson6";
import Lesson7 from "./pages/Lesson7";
import Lesson8 from "./pages/Lesson8";
import Lesson9 from "./pages/Lesson9";
import Lesson10 from "./pages/Lesson10";
import Lesson11 from "./pages/Lesson11";
import Lesson12 from "./pages/Lesson12";
import Lesson13 from "./pages/Lesson13";
import Lesson14 from "./pages/Lesson14";

const linkBase = {
  color: "#fff",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 10,
  fontSize: 14,
  whiteSpace: "nowrap",
};

function isLessonPassed(n) {
  return localStorage.getItem(`lesson${n}_passed`) === "1";
}

function LessonLink({ to, children, passed }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...linkBase,
        color: passed ? "#7CFF9A" : "#fff",
        background: isActive ? "rgba(255,255,255,0.22)" : "transparent",
        border: isActive
          ? "1px solid rgba(255,255,255,0.35)"
          : passed
          ? "1px solid rgba(124,255,154,0.35)"
          : "1px solid transparent",
      })}
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  // tick нужен, чтобы перерисовать navbar после прохождения теста
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onChanged = () => setTick((t) => t + 1);
    window.addEventListener("lesson-progress-changed", onChanged);
    window.addEventListener("storage", onChanged);
    return () => {
      window.removeEventListener("lesson-progress-changed", onChanged);
      window.removeEventListener("storage", onChanged);
    };
  }, []);

  // чтобы линтер не ругался на "tick unused" — просто используем его в вычислении
  const passed1 = isLessonPassed(1) || tick < 0;

  return (
    <BrowserRouter>
      {/* Navbar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#1b2230",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
          }}
        >
          <div style={{ color: "#fff", fontWeight: 800 }}>Git Training</div>

          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {/* Главная */}
            <LessonLink to="/home">Главная</LessonLink>

            {/* Уроки (пока подсвечиваем только 1-й, остальные добавишь по мере тестов) */}
            <LessonLink to="/lesson/1" passed={passed1}>
              Урок 1
            </LessonLink>
            <LessonLink to="/lesson/2" passed={isLessonPassed(2)}>
              Урок 2
            </LessonLink>
            <LessonLink to="/lesson/3" passed={isLessonPassed(3)}>
              Урок 3
            </LessonLink>
            <LessonLink to="/lesson/4" passed={isLessonPassed(4)}>
              Урок 4
            </LessonLink>
            <LessonLink to="/lesson/5" passed={isLessonPassed(5)}>
              Урок 5
            </LessonLink>
            <LessonLink to="/lesson/6" passed={isLessonPassed(6)}>
              Урок 6
            </LessonLink>
            <LessonLink to="/lesson/7" passed={isLessonPassed(7)}>
              Урок 7
            </LessonLink>
            <LessonLink to="/lesson/8" passed={isLessonPassed(8)}>
              Урок 8
            </LessonLink>
            <LessonLink to="/lesson/9" passed={isLessonPassed(9)}>
              Урок 9
            </LessonLink>
            <LessonLink to="/lesson/10" passed={isLessonPassed(10)}>
              Урок 10
            </LessonLink>
            <LessonLink to="/lesson/11" passed={isLessonPassed(11)}>
              Урок 11
            </LessonLink>
            <LessonLink to="/lesson/12" passed={isLessonPassed(12)}>
              Урок 12
            </LessonLink>
            <LessonLink to="/lesson/13" passed={isLessonPassed(13)}>
              Урок 13
            </LessonLink>
            <LessonLink to="/lesson/14" passed={isLessonPassed(14)}>
              Урок 14
            </LessonLink>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div style={{ minHeight: "calc(100vh - 58px)", background: "#0f1420", color: "#fff" }}>
        <Routes>
          {/* корень ведёт на главную */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* роут главной */}
          <Route path="/home" element={<Home />} />

          <Route path="/lesson/1" element={<Lesson1 />} />
          <Route path="/lesson/2" element={<Lesson2 />} />
          <Route path="/lesson/3" element={<Lesson3 />} />
          <Route path="/lesson/4" element={<Lesson4 />} />
          <Route path="/lesson/5" element={<Lesson5 />} />
          <Route path="/lesson/6" element={<Lesson6 />} />
          <Route path="/lesson/7" element={<Lesson7 />} />
          <Route path="/lesson/8" element={<Lesson8 />} />
          <Route path="/lesson/9" element={<Lesson9 />} />
          <Route path="/lesson/10" element={<Lesson10 />} />
          <Route path="/lesson/11" element={<Lesson11 />} />
          <Route path="/lesson/12" element={<Lesson12 />} />
          <Route path="/lesson/13" element={<Lesson13 />} />
          <Route path="/lesson/14" element={<Lesson14 />} />

          <Route path="*" element={<div style={{ padding: 24 }}>404: страница не найдена</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
