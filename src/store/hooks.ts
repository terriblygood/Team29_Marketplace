/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UnknownAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store';

type DispatchFunc = () => ThunkDispatch<RootState, any, UnknownAction>;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
