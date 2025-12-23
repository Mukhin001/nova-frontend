// import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppRootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<AppRootState>();
// export const useAppStore = useStore.withTypes<AppStore>();
//  export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
//  export const useAppSelector = useSelector.withTypes<AppRootState>();

export const useAppSelector = useSelector.withTypes<AppRootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
