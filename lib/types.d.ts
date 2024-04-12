export type UnSubscribeFunction = any;
export type Store<StateType = any> = {
    current: () => StateType | undefined;
    subscribe: (callback: (state: StateType) => any) => UnSubscribeFunction;
    mutations: Mutations;
};
export type Subscriptions<StateType = any> = {
    [subscriptionName in keyof Store<StateType>['mutations']]?: SubscriptionsTypes;
};
export type SubscriptionsTypes = {
    willCommit?: <MutationType = any>(mutation: MutationType) => void;
    didCommit?: <MutationType = any>(mutation: MutationType) => void;
};
export type Mutations = {
    [mutationName: string]: (payload?: any) => any;
};
export type StoreSetMutationProps = {
    path?: string;
    value: any;
};
export type MutationOperations<StateType> = {
    current: () => StateType;
    reset: () => void;
    set: (setParams: StoreSetMutationProps) => void;
    merge: (state: Partial<StateType>) => void;
    optimistic: (key: string, value: any) => any;
};
export type SubscriptionsOperations<StateType> = {
    current: () => StateType;
    forward: <ForwardedType = any>(key: string, value: ForwardedType) => void;
    undo: () => void;
};
export type createStoreProps<StateType = any> = {
    initialState: StateType | undefined;
    mutations?: (operations: MutationOperations<StateType>) => Mutations;
    subscriptions?: (operations: SubscriptionsOperations<StateType>) => Subscriptions<StateType>;
};
export type createStoreReturn<StateType> = Store<StateType>;
export type useStoreReturn<StateType = any, SelectionType = StateType> = [StateType | SelectionType, {
    [functionName: string]: Function;
}];
export type createStoreHookReturn<StateType, SelectionType> = (selector?: SelectorFunction) => useStoreReturn<StateType, SelectionType>;
export type createStoreHookProps<StateType = any> = createStoreProps<StateType>;
export type SelectorFunction<StateType = any, SelectedType = any> = (state: StateType) => SelectedType;
