import numpy as np
import pytesseract
# pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
import cv2
def ml_predict():    
    imag = cv2.imread('./images/test1.png',1)
    image = cv2.resize(imag,(500,400))
    image_gre = cv2.imread("./images/test1.png",0)
    image_grey = cv2.resize(image_gre,(500,400))    
    def imgshow(a):
        cv2.imwrite('./images/tasty.png',a)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
    bil_blurr = cv2.bilateralFilter(image_grey,9,75,75)
    # imgshow(bil_blurr)
    edge = cv2.Canny(bil_blurr,170,200)
    # imgshow(edge)
    edge_copy=edge.copy()
    cntr,heirarchy = cv2.findContours(edge_copy,cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
    imcopy = image.copy()
    cv2.drawContours(imcopy,cntr,-1,(0,255,0),3)
    # imgshow(imcopy)
    cntr = sorted(cntr,key=cv2.contourArea,reverse=True)[:100]
    imcopy_1=image.copy()
    cv2.drawContours(imcopy_1,cntr,-1,(0,255,0),3)
    # imgshow(imcopy_1)
    numberplate_cnt=None
    k=2
    for c in cntr:
        print(k)
        perimeter = cv2.arcLength(c,True)
        approximate = cv2.approxPolyDP(c,0.01*perimeter,True)
        if len(approximate)==4:
            numberplate_cnt=approximate
            x,y,a,b=cv2.boundingRect(c)
            new_img=image[y:y+b,x:x+a]
            cv2.imwrite('images/'+str(k)+'.png',new_img)
            k+=1
            break
    cv2.drawContours(image,[numberplate_cnt],-1,(0,255,0),2)
    # imgshow(image)
    cropped_image = cv2.imread('Test_crop/2.png')
    cropped_image = cv2.resize(cropped_image,(200,75))
    # imgshow(cropped_image)
    number = pytesseract.image_to_string('Test_crop/2.png',lang='eng')
    print(number)
    return number