export interface orderWithDetailDTO {
  empid: number;
  shipperid: number;
  shipname: string;
  shipaddress: string;
  shipcity: string;
  orderdate: Date;
  requireddate: Date;
  shippeddate: Date;
  freight: number;
  shipcountry: string;
  orderid: number;
  productid: number;
  unitprice: number;
  qty: number;
  discount: number;
}
