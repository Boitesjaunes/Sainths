
// for showing empty row when nobody get in to game yet.
function StillNobodyRow({ num }) {
    return (
        <tr className="bg-green-100" key={num}>
            <td className="text-center"></td>
            <td className="text-center">Jeszcze nikogo nie ma? 🤨</td>
            <td className="text-center"></td>
        </tr>
    )
}

export default StillNobodyRow;