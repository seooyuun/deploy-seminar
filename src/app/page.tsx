'use client';

import React, { useEffect, useMemo, useState } from 'react';
import TodoTemplate from '@/components/TodoTemplate';
import TodoHead from '@/components/TodoHead';
import TodoList from '@/components/TodoList';
import TodoCreate from '@/components/TodoCreate';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

const TODO_LIST = [
  {
    id: 1,
    text: '자바스크립트 공부하기',
    category: '공부',
    done: false,
    completeTime: null,
  },
  {
    id: 2,
    text: 'EFUB 가기',
    category: '학교',
    done: false,
    completeTime: null,
  },
];

const STORAGE_KEY = 'todos';

const Button = styled.button`
  background-color: #bddde4;
  border: none;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  padding: 10px 24px;
  font-size: 16px;
  color: white;
  cursor: pointer;

  margin: 0 auto;
  position: relative;

  &:hover {
    background-color: #d5e9ee;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 12px;
`;

function TodoPage() {
  const router = useRouter();

  const [todos, setTodos] = useState(TODO_LIST);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const undoneTasksResult = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  );

  const lastCompletedResult = useMemo(() => {
    return todos
      .filter((todo) => todo.completeTime)
      .sort(
        (a, b) =>
          new Date(b.completeTime).getTime() -
          new Date(a.completeTime).getTime()
      )[0];
  }, [todos]);

  return (
    <>
      <ButtonContainer>
        <Button onClick={() => router.push('/playlist')}>
          🎵 플레이리스트
        </Button>
        <Button onClick={() => router.push('/gallery')}>🖼️ 갤러리</Button>
      </ButtonContainer>
      <TodoTemplate>
        <TodoHead
          undoneTasksResult={undoneTasksResult}
          lastCompletedResult={lastCompletedResult}
        />
        <TodoList todos={todos} setTodos={setTodos} />
        <TodoCreate todos={todos} setTodos={setTodos} />
      </TodoTemplate>
    </>
  );
}

export default TodoPage;
