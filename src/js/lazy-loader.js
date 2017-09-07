/**
 * Created by mason on 12/07/2017.
 */
import BLazy from "blazy/blazy.min"

export default class LazyLoader{
    constructor(_){
        console.log(BLazy)

        this.document = _;
        new BLazy({
            selector:"img",
            breakpoints:[
                {
                    width:800,
                    src:"data-src-medium"
                }
            ]

        })
    }
}