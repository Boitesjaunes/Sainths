import { Link } from "react-router-dom";


function ChooseTypePage() {
    return (
        <div className="w-screen h-screen flex items-center relative flex-col justify-center">

            <div className="mockup-phone">
                <div className="camera !w-44 after:!bg-gray-700 before:!bg-gray-700"></div>
                <div className="display">
                    <div className="artboard artboard-demo phone-1 justify-evenly
                    pt-36 pb-24">
                        <h2 className="text-xl mb-8 font-medium text-center pl-4 ">
                            Wybieraj i graj!
                            {/* font-mono text-sm bg-transparent text-blue-700 */}
                            <span className="badge badge-lg bg-green-600 !border-0 ml-4 bg-blue-700">Nowości!</span>
                        </h2>
                        <div className="chat chat-start self-start pl-2">
                            <div className="btn chat-bubble bg-green-600 !border-0"><Link to={"/local/main"} className=" normal-case text-white font-normal">Graj lokalnie Serwer</Link></div>
                        </div>
                        <div className="chat chat-end self-end pr-2">
                            <div className="btn chat-bubble bg-red-600  !border-0"><Link to={"/online/main"} className="normal-case text-white font-normal">Graj Online Serwer</Link></div>
                        </div>
                        <div className="chat chat-start self-start pl-2">
                            <div className="btn chat-bubble bg-green-600 !border-0"><Link to={"/local/user"} className=" normal-case text-white font-normal">Graj lokalnie Gracz</Link></div>
                        </div>
                        <div className="chat chat-end self-end pr-2">
                            <div className="btn chat-bubble bg-red-600 !border-0"><Link to={"/online/user"} className="normal-case text-white font-normal">Graj Online Gracz</Link></div>
                        </div>




                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChooseTypePage;