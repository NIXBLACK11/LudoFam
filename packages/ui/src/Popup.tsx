import '../index.css';

interface PopupProps {
    color: string;
}

export const Popup: React.FC<PopupProps> = ({ color }) => {
    return (
        <div>
            <div id="info-popup" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                        <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                            <h3 className="mb-3 text-2xl font-custom font-color">Color</h3>
                            <p className='font-custom font-color text-1xl'>
                                You are {color}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
}