package controllers

import play.api.libs.json.Format.GenericFormat
import play.api.libs.json._
import play.api.libs.json.{Json, Writes}
import javax.inject.Inject
import play.api.mvc._

case class Product(code: Long, name: String, price: Double)

object Product {
  implicit val productReads: Reads[Product] = Json.reads[Product]
  implicit val productWrites: Writes[Product] = Json.writes[Product]
}

class ProductController @Inject() (cc: ControllerComponents) extends AbstractController(cc) {
  var products: List[Product] = List(
    Product(5382, "Product1", 10.99),
    Product(3242, "Product2", 20.49),
    Product(2465, "Product3", 5.99)
  )

  def listProducts() = Action { implicit request: Request[AnyContent] =>
    request.headers.get("User-Agent") match {
      case Some(userAgent) if userAgent.contains("Postman") =>
        val json = Json.toJson(products)
        Ok(json)
      case _ =>
        Ok(views.html.index(products))
    }
  }

  def deleteProduct(code: Long) = Action { implicit request: Request[AnyContent] =>
    products.find(_.code == code) match {
      case Some(_) =>
        products = products.filterNot(_.code == code)
        Redirect(routes.ProductController.listProducts()).flashing("success" -> "Product deleted successfully")
      case None =>
        NotFound("Product not found")
    }
  }

  def addProduct() = Action(parse.json) { implicit request =>
    request.body.validate[Product].fold(
      errors => {
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
      },
      product => {
        if (products.exists(_.code == product.code)) {
          BadRequest(Json.obj("message" -> "Product with this code already exists"))
        } else {
          products = product :: products
          Ok(Json.obj("message" -> "Product added successfully"))
        }
      }
    )
  }

  def modifyProduct(code: Int) = Action(parse.json) { implicit request =>
    val nameOption = (request.body \ "name").asOpt[String]
    val priceOption = (request.body \ "price").asOpt[Double]

    (nameOption, priceOption) match {
      case (Some(name), Some(price)) =>
        val modifiedProduct = Product(code, name, price)

        var found = false
        var i = 0
        while (i < products.length && !found) {
          if (products(i).code == code) {
            products = products.updated(i, modifiedProduct)
            found = true
          }
          i += 1
        }

        if (found) {
          Ok(Json.obj("message" -> "Product modified successfully"))
        } else {
          NotFound(Json.obj("message" -> "Product with this code does not exist"))
        }
      case _ =>
        BadRequest(Json.obj("message" -> "Invalid JSON format. 'name' should be a string and 'price' should be a number."))
    }
  }





  //
//  def listProducts: Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
//    Ok(products.map(p => s"ID: ${p.id}, Name: ${p.name}, Price: ${p.price}").mkString("\n"))
//  }
//
//  def addProduct: Action[JsValue] = Action(parse.json) { request =>
//    val productResult = request.body.validate[Product]
//    productResult.fold(
//      errors => {
//        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
//      },
//      product => {
//        val newProduct = Product(products.length + 1, product.name, product.price)
//        products = newProduct :: products
//        Ok(Json.toJson(newProduct))
//      }
//    )
//  }
//
//  def updateProduct(id: Int): Action[JsValue] = Action(parse.json) { request =>
//    val productResult = request.body.validate[Product]
//    productResult.fold(
//      errors => {
//        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
//      },
//      updatedProduct => {
//        products.find(_.id == id) match {
//          case Some(productToUpdate) =>
//            // Update product data
//            val updatedProductList = products.map { product =>
//              if (product.id == id) updatedProduct else product
//            }
//            products = updatedProductList
//            Ok(Json.toJson(updatedProduct))
//          case None =>
//            NotFound(Json.obj("message" -> "Product not found"))
//        }
//      }
//    )
////  }
//  def index() = Action { implicit request: Request[AnyContent] =>
//    Ok(views.html.index(products))
//  }
}
