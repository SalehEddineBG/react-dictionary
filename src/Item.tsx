import { ACTIONS, Action, State } from "./App";
import { Word } from "./App";
interface IItem{
    item:Word;
    index:number;
    dispatch: (a:Action) => void ;
};

function Item({ item, index, dispatch }:IItem) {
    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td className="fw-bolder" data-testid={`type${index+1}`}>{item.partOfSpeech}</td>
                <td className="fst-italic"> {item.definition.definition}  </td>
                <td><button type="button" className="btn btn-dark text-light" data-testid={`btn${index+1}`} onClick={(e:any) => {
                    e.preventDefault();
                    dispatch({ type: ACTIONS.DATA_DELETE_ITEM, index: index,payload:null });
                }}>Delete</button></td>
            </tr>
        </>
    );
}
export { Item };
export default Item;