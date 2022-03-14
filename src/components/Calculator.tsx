
export function Calculator(price:number, promotion:Array<boolean>){
    if(price>0){
        if(promotion[0]){
            price=price*0.95;
            if(promotion[2]){
                if(price>20){
                    return price=price-20;
                }
                if(price<20){
                    return 0;
                }
            }else{
                return price;
            }
        }
        if(promotion[1]){
            price=price*0.80;
            return price;
        }
        if(!promotion[0] && !promotion[1] && promotion[2]){
            if(price<20){
                return 0;
            }
            if(price>20){
                return price=price-20;
            }
        }
        if(!promotion[0] && !promotion[1] && !promotion[2]){
            return price;
        }
    }else{
        return 0;
    }
}
