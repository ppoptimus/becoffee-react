import { useState, useEffect } from "react"
import axios from "axios"
import Config from "./system.json"
import Swal from "sweetalert2"
import "./Orders.css"

export default function Orders() {
	let [coffeeCount, setCoffeeCount] = useState(0)
	let [cocoCount, setCocoCount] = useState(0)
	let [totalCoffee, setTotalCoffee] = useState(0)
	let [totalCoco, setTotalCoco] = useState(0)
	let [netPrice, setNetPrice] = useState(0)

	let [pCoffee, setpCoffee] = useState("")
	let [pCoco, setpCoco] = useState("")

	let [customerName, setCustomerName] = useState("")
	let [customerPhone, setCustomerPhone] = useState("")
	let [customerAddress, setCustomerAddress] = useState("")

	let [isShowDetail, setIsShowDetail] = useState(false)
	let [isValid, setIsValid] = useState("*")
	let [isPaynow, setIsPaynow] = useState(false)
	let [isUploaded, setIsUploaded] = useState(false)
	let [imageUrl, setImageUrl] = useState("")
	let [imagePreview, setImagePreview] = useState("")
	let [paymentMethod, setPaymentMethod] = useState("")

	let [isFinish, setIsFinish] = useState(false)
	const [isClickConfirm, setisClickConfirm] = useState(false)

	const onCoffeeChange = (e) => {
		if (e.target.value < 0) {
			return false
		}
		setCoffeeCount(e.target.value)
	}

	const onCocoChange = (e) => {
		if (e.target.value < 0) {
			return false
		}
		setCocoCount(e.target.value)
	}

	const onNameChange = (e) => {
		setCustomerName(e.target.value)
	}
	const onPhoneChange = (e) => {
		setCustomerPhone(e.target.value)
	}
	const onAddressChange = (e) => {
		setCustomerAddress(e.target.value)
	}

	const confirming = () => {
		setpCoffee(coffeeCount > 0 ? `กาแฟ B Easy Coffee : ${coffeeCount} ชิ้น = ${totalCoffee}` : "")
		setpCoco(cocoCount > 0 ? `โกโก้ B Easy Cocoa : ${cocoCount} ชิ้น = ${totalCoco}` : "")
	}

	useEffect(() => {
		setTotalCoffee(250 * coffeeCount)
		setTotalCoco(290 * cocoCount)
		setNetPrice(totalCoffee + totalCoco)
		setIsShowDetail(netPrice > 0 ? true : false)
		setIsValid(customerName && customerName && customerAddress !== "" ? "" : "*")
	}, [coffeeCount, cocoCount, totalCoffee, totalCoco, netPrice, customerName, customerAddress])

	const onRadioCADClick = () => {
		setIsPaynow(false)
		setIsFinish(true)
		setPaymentMethod("ชำระปลายทาง")
	}

	const onRadioTransferClick = () => {
		setIsPaynow(true)
		setIsFinish(false)
		setPaymentMethod("ชำระแล้ว รอการตรวจสอบหลักฐาน")
	}

	const uploadImage = (e) => {
		setImagePreview(URL.createObjectURL(e.target.files[0]))
		const formData = new FormData()
		formData.append("file", e.target.files[0])
		formData.append("upload_preset", "loobnb2s")

		axios
			.post("https://api.cloudinary.com/v1_1/pumpo/image/upload", formData)
			.then((res) => {
				setImageUrl(res.data.secure_url)
				setIsUploaded(true)
				setIsFinish(true)
			})
			.catch((err) => {
				console.log("upload image " + err)
			})
	}

	const postOrdersToSheet = async () => {
		setisClickConfirm(true)
		const today = new Date()
		const orderId =
			today.getUTCFullYear() +
			"" +
			(today.getUTCMonth() + 1) +
			"" +
			today.getUTCDate() +
			"" +
			today.getHours() +
			"" +
			today.getMinutes() +
			"" +
			today.getSeconds() +
			"" +
			today.getMilliseconds()

		const obj = {
			เลขที่คำสั่งซื้อ: orderId,
			จำนวนกาแฟ: coffeeCount,
			จำนวนโกโก้: cocoCount,
			ชื่อลูกค้า: customerName,
			เบอร์โทร: customerPhone,
			ที่อยู่จัดส่ง: customerAddress,
			วันที่สั่งซื้อ: today.toLocaleString("en-GB"),
		}
		const messageToLine = `เลขที่คำสั่งซื้อ : ${orderId} \n
ชื่อลูกค้า : ${customerName} \n
เบอร์โทร : ${customerPhone} \n
จำนวนกาแฟที่สั่ง : ${coffeeCount} \n
จำนวนโกโก้ที่สั่ง : ${cocoCount} \n
ที่อยู่จัดส่ง : ${customerAddress} \n
วันที่สั่ง : ${obj.วันที่สั่งซื้อ} \n
วิธีการชำระเงิน : ${paymentMethod}`

		console.log(messageToLine)

		await axios
			.post("https://sheet.best/api/sheets/aac31169-7e2d-4830-aa19-2129ce0398f8", obj, {
				headers: {
					"X-Api-Key": "yTybP!CMopZ-tzEKR@4NnfywGvnazlscqW52ZD0DVnIySwT-Ptx3Kw2DCEI@pwPQ",
				},
			})
			.then((res) => {
				postToLine(messageToLine)
			})
			.catch((err) => {
				console.log("postsheet " + err)
			})
	}

	const postToLine = (messageToLine) => {
		var raw = JSON.stringify({
			url_enpoint: Config.CONFIG1.LINE_MESSAGE_MULTICAST_URL,
			user_id: Config.CONFIG1.LINE_USER_ID,
			message: messageToLine,
			originalContentUrl: imageUrl,
			previewImageUrl: imageUrl,
			isImage: isPaynow,
		})

		var requestOptions = {
			method: "POST",
			headers: Config.CONFIG1.LINE_MESSAGE_HEADER,
			body: raw,
			redirect: "follow",
		}

		const postMessage = () => {
			fetch("https://becoffee-node.herokuapp.com/multicast", requestOptions)
				.then((response) => popupRefresh())
				.catch((error) => console.log("error", error))
		}

		postMessage()
	}

	const popupRefresh = () => {
		let timerInterval
		return Swal.fire({
			title: "สั่งซื้อสำเร็จ",
			html: 'กำลังนำท่านไปยังหน้าหลักใน <b></b> วินาที.',
			icon: "success",
			background: "",
			confirmButtonColor: "#3085d6",
			confirmButtonText: "ตกลง",
			timer: 5000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				const b = Swal.getHtmlContainer().querySelector("b")
				timerInterval = setInterval(() => {
					b.textContent = Swal.getTimerLeft()
				}, 1000)
			},
			willClose: () => {
				clearInterval(timerInterval)
			},
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				refreshPage()
			}
			
		})
	}

	return (
		<div className='container my-2'>
			<table className='table table-hover text-center'>
				<thead>
					<tr style={{ fontSize: "2.2vw" }}>
						<th className='col-4'>สินค้า</th>
						<th className='col-2'>ราคาต่อชิ้น</th>
						<th className='col-3'>จำนวนสินค้า</th>
						<th className='col-3'>ราคารวม</th>
					</tr>
				</thead>
				<tbody className='align-middle'>
					<tr className='table-dark center'>
						<td className='col-4'>
							<img src='/img/coffee1.jpg' className='img-fluid' width={300} alt='easy coffee'></img>
						</td>
						<td className='col-2'>250.00</td>
						<td className='col-3'>
							<input
								id='coffeequantity'
								type='number'
								min='0'
								className='form-control text-end fs-5'
								placeholder='0'
								onChange={onCoffeeChange}
								value={coffeeCount}></input>
						</td>
						<td className='col-3'>
							<label id='coffeeprice' className='text-success fs-5 fw-bold'>
								{formatting(totalCoffee)}
							</label>
						</td>
					</tr>

					<tr className='table-dark center'>
						<td className='col-4'>
							<img src='/img/coco1.jpg' className='img-fluid' width={300} alt='easy coffee'></img>
						</td>
						<td className='col-2'>290.00</td>
						<td className='col-3'>
							<input
								id='cocoquantity'
								type='number'
								min='0'
								className='form-control text-end fs-5'
								placeholder='0'
								onChange={onCocoChange}
								value={cocoCount}></input>
						</td>
						<td className='col-3'>
							<label id='coffeeprice' className='text-success fs-5 fw-bold'>
								{formatting(totalCoco)}
							</label>
						</td>
					</tr>
					<tr className='table-success fs-lg-4 fs-sm-5 fw-bold'>
						<td></td>

						<td colSpan='2'>ราคาสุทธิ</td>
						<td>{formatting(netPrice)}</td>
					</tr>
				</tbody>
			</table>

			{netPrice > 0 ? (
				<div className='accordion' id='accordionExample'>
					<div className='accordion-item'>
						<h2 className='accordion-header' id='headingOne'>
							<button
								className='accordion-button collapsed fw-bold'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseOne'
								aria-expanded='false'
								aria-controls='collapseOne'>
								{isValid} กรอกที่อยู่ในการจัดส่ง
							</button>
						</h2>
						<div id='collapseOne' className='accordion-collapse collapse' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
							<div className='form-group mt-1'>
								<small className='form-text text-muted'>ช่องทางการติดต่อ</small>
								<input
									type='text'
									maxLength='50'
									className='form-control'
									placeholder='ชื่อ - นามสกุล'
									onChange={onNameChange}
									value={customerName}
								/>
								<input
									type='tel'
									maxLength='10'
									required
									className='form-control'
									placeholder='หมายเลขโทรศัพท์'
									onChange={onPhoneChange}
									value={customerPhone}
								/>

								<br />
								<small className='form-text text-muted'>ที่อยู่</small>
								<textarea
									type='text'
									maxLength='255'
									className='form-control'
									placeholder='ที่อยู่จัดส่ง'
									row='2'
									onChange={onAddressChange}
									value={customerAddress}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}

			<hr />
			{!isValid ? (
				<div className='accordion' id='accordionTransfer'>
					<div className='accordion-item'>
						<h2 className='accordion-header' id='headingTwo'>
							<button
								className='accordion-button collapsed fw-bold'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseTwo'
								aria-expanded='false'
								aria-controls='collapseTwo'>
								เลือกวิธีการชำระเงิน
							</button>
						</h2>
						<div id='collapseTwo' className='accordion-collapse collapse' aria-labelledby='collapseTwo' data-bs-parent='#accordionTransfer'>
							{/* {!isUploaded ? (
								<div className='form-check mt-2'>
									<label className='form-check-label'>
										<input type='radio' className='form-check-input' name='optionsRadios' onClick={onRadioCADClick} />
										ชำระเงินปลายทาง
									</label>
								</div>
							) : (
								""
							)} */}
							<div className='form-check'>
								<label className='form-check-label'>
									<input type='radio' className='form-check-input' name='optionsRadios' onClick={onRadioTransferClick} />
									{"ชำระเงินทันที (กรุณาอัพโหลดสลิป)"}
								</label>
								<p className="fs-6"><i>** หากต้องการชำระเงินปลายทาง กรุณาติดต่อช่องทางไลน์ Official</i></p>
							</div>

							{isPaynow ? (
								<div className='text-center justify-content-center'>
									<ul className='list-group bg-dark'>
										<li className='list-group-item d-flex justify-content-between align-items-center fw-bold border-primary'>
											ยอดเงินที่ต้องชำระทันที
											<span className='badge bg-primary rounded-pill fs-6'>{formatting(netPrice)}</span>
										</li>
										<li className='list-group-item d-flex justify-content-between align-items-center'>{"ธนาคาร ซีไอเอ็มบี ไทย (CIMB)"}</li>
										<li className='list-group-item d-flex justify-content-between align-items-center'>{"ชื่อบัญชี : ปรียาภรณ์ ชุมนุมราษฎ์"}</li>
										<li className='list-group-item d-flex justify-content-between align-items-center'>{"เลขที่บัญชี : 701-215-7932"}</li>
									</ul>

									<div className='container'>
										<label htmlFor='file-upload' className='custom-file-upload'>
											เมื่อโอนเงินแล้ว คลิกเพื่ออัพโหลดสลิปที่นี่
										</label>

										<input id='file-upload' className='form-control w-50 bg-body' type='file' name='upload_image' onChange={uploadImage} />
									</div>
									{imagePreview ? <img className='img-fluid m-1' src={imagePreview} width='320' crop='scale' alt='be coffee'></img> : ""}

									{/* <Image className='img-fluid m-1' cloudName='pumpo' publicId={imageUrl} width='320' crop='scale'></Image> */}
								</div>
							) : (
								""
							)}
						</div>
					</div>
          <hr />
				</div>
			) : (
				""
			)}

			{!isValid && isFinish ? (
				<div className='text-end my-1'>
					<button
						className='btn btn-warning py-3 px-lg-5 px-md-4 px-sm-1 w-100 text-xxl-center'
						data-bs-toggle='modal'
						data-bs-target='#confirmOrder'
						onClick={confirming}
						style={{fontSize:'larger', fontWeight:'bolder', backgroundColor:'#fb4a00'}}>
						ตรวจสอบคำสั่งซื้อ
					</button>
				</div>
			) : (
				""
			)}

			<div className='modal fade' id='confirmOrder' tabIndex={-1} aria-labelledby='exampleModalLabel' aria-hidden='true'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-body'>
							<p>{pCoffee}</p>
							<p>{pCoco}</p>
							{isShowDetail && (
								<div>
									<p>ชื่อผู้ซื้อ : {customerName}</p>
									<p>เบอร์โทร : {customerPhone}</p>
									<p>ที่อยู่จัดส่ง : {customerAddress}</p>
									<p>ยอดสุทธิ : {formatting(netPrice)}</p>
									<p>วิธีการชำระเงิน : {paymentMethod}</p>
								</div>
							)}
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
								แก้ไข
							</button>
							{isFinish ? (
								<button type='button' className='btn btn-success' style={{ backgroundColor: "#1b8c2e" }} onClick={postOrdersToSheet}>
									
									{!isClickConfirm?'ยืนยันคำสั่งซื้อ':(
										<div>
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
										<span>กำลังส่ง...</span>
									  </div>
									  
									)}
								</button>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const formatting = (x) => {
	return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function refreshPage() {
	window.scrollTo(0, 0)
	window.location.reload(false)
}
