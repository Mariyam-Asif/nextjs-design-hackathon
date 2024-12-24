import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";

export default function Checkout(){
    return (
        <div>
            <Banner pageName="Checkout" showLogo={true}/>
            {/* Billing Details */}
            <div>
                <h3>
                    <form>
                        
                    </form>
                </h3>
            </div>
            {/* Place Order */}
            <div></div>
            <Guarantees/>
        </div>
    )
}