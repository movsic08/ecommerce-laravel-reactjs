import axios from "axios";
import { useEffect, useState } from "react";

export default function SelectedConversation() {
    const [currentConvoParam, setCurrentConvoParam] = useState(null);
    const [conversationData, setConversationData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get("currentConvo");
        setCurrentConvoParam(param);
    }, []);

    const fetchConversation = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/get-convo', {
                params: { convoId: currentConvoParam }
            });
            setConversationData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching conversation data:", err);
            setError("Unable to load conversation data.");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchConversation();
    }, [currentConvoParam]);

    return (
        <div className={`w-full pt-[10rem] overflow-y-auto flex ${currentConvoParam ? 'w-full' : 'items-center justify-center'} bg-white border-r min-h-[39.010rem] max-h-screen`}>
            {error ? (
                <p className="font-semibold text-red-500">{error}</p>
            ) : currentConvoParam ? (
                <div>
                    <div className="w-full p-4 bg-red-500">top</div>
                    <div className="w-full p-4 bg-blue-500">bottom</div>
                </div>
            ) : (
                <p className="text-lg font-semibold text-gray-600">
                    Welcome to MadeByHands
                </p>
            )}
        </div>
    );
}
