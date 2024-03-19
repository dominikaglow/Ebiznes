package controllers

import javax.inject._
import play.api._
import play.api.libs.json.{JsError, JsValue, Json, OFormat}
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import play.api.data.format.Formats.doubleFormat

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */

//case class Product(code: Int, name: String, price: Double)
//object Product { implicit val productFormat: OFormat[Product] = Json.format[Product]}

@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

//  var products = List(
//    Product(1, "Product1", 10.99),
//    Product(2, "Product2", 20.49),
//    Product(3, "Product3", 5.99)
//  )

//  def listProducts: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
//    Ok(products.map(p => s"Code: ${p.code}, Name: ${p.name}, Price: ${p.price}").mkString("\n"))
//  }

//  def addProduct(code: Int, name: String, price: Double): Action[AnyContent] = Action { implicit request =>
//    val newProduct = Product(code, name, price)
//    products = newProduct :: products
//    Ok(Json.toJson(newProduct))
//  }

//  def deleteProduct: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
//
//  }

//  def addProduct(code:Int, name:String, price:Int): Action[AnyContent] = Action { implicit request =>
//    val newProd = Product(code, name, price)
//    products = newProd :: products
//    Ok("Product added successfully")
//  }

//  def deleteProductByCode(code:Int): Action[AnyContent] = Action { implicit request =>
//    val chosenProd = products.indexWhere(_.code == code)
//
//    if(chosenProd != 1) {
//      products = products.patch(chosenProd, Nil, 1)
//      Ok("Product deleted successfully")
//    }
//    else {
//      NotFound("Product not found")
//    }
//  }

}
