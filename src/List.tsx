import { Action, State, Word } from "./App";
import Item from "./Item";
interface IList {
    data: Array<Word> | null;
    dispatch: (a: Action) => void;
};
function List({ data, dispatch }: IList) {
    return (
        <>
            <table className="table  border-primary table-hover " title="Response">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Definition</th>
                        <th scope="col">Action</th>
                    </tr>
                    {data ? data.map((d: Word, index: number) => {
                        return <Item item={d} key={index} index={index} dispatch={dispatch} />
                    }) : <></>}
                </thead>
                <tbody>

                </tbody>
            </table>
        </>
    );
}
export { List };
export default List;